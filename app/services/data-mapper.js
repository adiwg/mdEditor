import Service from '@ember/service';
import { A, isArray } from '@ember/array';
import uuidV4 from "uuid/v4";
import { assign } from '@ember/polyfills';
import { fixLiabilityTypo } from 'mdeditor/utils/fix-liability-typo';
import { getWithDefault } from '@ember/object';

export default class DataMapperService extends Service {

  getTitle(record) {
    let raw = record.attributes.json;
    let json = raw ? JSON.parse(raw) : null;

    switch(record.type) {
    case 'records':
      return getWithDefault(json, 'metadata.resourceInfo.citation.title', 'NO TITLE');
    case 'dictionaries':
      return getWithDefault(json, 'dataDictionary.citation.title', 'NO TITLE');
    case 'contacts':
      return json.name || 'NO NAME';
    case 'schemas':
      return record.attributes.title || 'NO TITLE';
    default:
      return 'N/A';
    }
  }

  formatMdJSON(json) {
    const { contact, dataDictionary, metadata } = json;
    const data = A();

    if (contact) {
      contact.forEach((item) => {
        data.pushObject(new Template({
          attributes: {
            json: JSON.stringify(assign({}, item))
          },
          type: 'contacts'
        }));
      });
    }

    if (!metadata.metadataInfo.metadataIdentifier) {
      metadata.metadataInfo.metadataIdentifier = {
        identifier: uuidV4(),
        namespace: 'urn:uuid'
      };
    }

    data.pushObject(new Template({
      attributes: {
        json: JSON.stringify(json)
      },
      type: 'records'
    }));

    if (dataDictionary) {
      dataDictionary.forEach((item) => {
        data.pushObject(new Template({
          attributes: {
            json: JSON.stringify({ dataDictionary: item })
          },
          type: 'dictionaries'
        }));
      });
    }

    return data;
  }

  mapRecords(records) {
    return records.reduce((accumulatedRecords, item) => {
      // Initialize the type array if it doesn't exist
      if (!accumulatedRecords[item.type]) {
        accumulatedRecords[item.type] = [];
    }

    // Use optional chaining and nullish coalescing for safer access and assignment
    const meta = {
      title: this.getTitle(item),
      icon: this.icons[item.type] ?? 'defaultIcon',
      export: true,
    };

    // Create a new item with meta and add it to the type-specific array
    accumulatedRecords[item.type].push(EmObject.create({ ...item, meta }));

      return accumulatedRecords;
    }, {});
  }

  mapEditorJSON({ file, json }) {
    const validator = this.jsonvalidator.validator;
    if (!validator.validate('jsonapi', json)) {
      throw new Error(`${file.name} is not a valid mdEditor file.`);
    }

    return this.mapRecords(json.data);
  }

  mapMdJSON(data) {
    let mappedData = A();

    // Simplify the conditional logic with a ternary operator and spread operator
    const items = isArray(data.json) ? data.json : [data.json];
    items.forEach((item) => {
      mappedData = [...mappedData, ...this.formatMdJSON(item)];
    });

    set(data, 'json.data', mappedData);

    return this.mapRecords(mappedData);
  }

  mapJSON({ json: { data }, route }) {
    // Determine the mapping function based on data type
    let files = isArray(data) ? this.mapEditorJSON({ json: { data }, route }) : this.mapMdJSON({ json: { data }, route });

    // Fix a common typo in liability field
    fixLiabilityTypo(files);

    // Update the current route model with new files and data
    route.currentRouteModel()
      .set('files', files)
      .set('data', data);
  }
}
