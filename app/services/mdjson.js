import Ember from 'ember';
import Ajv from 'npm:ajv';
import Schemas from 'npm:mdjson-schemas/resources/js/schemas.js';
import {
  formatCitation
} from 'mdeditor/pods/components/object/md-citation/component';
import draft4 from 'npm:ajv/lib/refs/json-schema-draft-04.json';

const validator = new Ajv({
  verbose: true,
  allErrors: true,
  jsonPointers: true,
  removeAdditional: false
});

//support draft-04
validator.addMetaSchema(draft4);

Object.keys(Schemas)
  .forEach(function(key) {
    let val = Schemas[key];

    validator.addSchema(val, key);
  });

const {
  Service,
  inject,
  isArray,
  set,
  get,
  getWithDefault,
  Object: EmObject

} = Ember;

const unImplemented = [
  'dataDictionary',
  'metadata.metadataInfo.otherMetadataLocale',
  'metadata.resourceInfo.spatialRepresentation', [
    'metadata.resourceInfo.extent',
    'verticalExtent'
  ],
  ['metadata.resourceInfo.extent',
    'temporalExtent'
  ],
  'metadata.resourceInfo.coverageDescription',
  'metadata.resourceInfo.taxonomy',
  'metadata.resourceInfo.otherResourceLocale',
  'metadata.resourceInfo.resourceMaintenance'
];

export default Service.extend({
  cleaner: inject.service(),
  contacts: inject.service(),
  store: inject.service(),

  injectCitations(json) {
    let assoc = json.metadata.associatedResource;

    if(assoc) {
      let refs = assoc.reduce((acc, itm) => {
        if(itm.mdRecordId) {
          acc.push(itm);
        }
        return acc;
      }, []);

      let records = this.get('store').peekAll('record').filterBy('recordId');

      refs.forEach((ref) => {
        let record = records.findBy('recordId', ref.mdRecordId);

        if(record) {
          let info = get(record, 'json.metadata.metadataInfo') || {};
          let metadata = {
            'title': `Metadata for ${get(record,'title')}`,
            'responsibleParty': getWithDefault(info,
              'metadataContact', []),
            'date': getWithDefault(info, 'metadataDate', []),
            'onlineResource': getWithDefault(info,
              'metadataOnlineResource', []),
            'identifier': [getWithDefault(info, 'metadataIdentifier', {})],
          };

          let citation = get(record,
            'json.metadata.resourceInfo.citation') || {};
          let resourceType = get(record,
            'json.metadata.resourceInfo.resourceType') || [];

          set(ref, 'resourceCitation', EmObject.create(formatCitation(
            citation)));
          set(ref, 'metadataCitation', EmObject.create(formatCitation(
            metadata)));
          set(ref, 'resourceType', resourceType);
        }
      });
    }
  },

  formatRecord(rec, asText) {
    let _contacts = [];
    let conts = this.get('contacts');

    const _replacer = (key, value) => {
      let check = {
        contactId: true,
        sourceId: true,
        recipientId: true
      };
      //console.log(arguments);
      if(check[key] && !_contacts.includes(value)) {
        let contact = conts.get('contacts').findBy('contactId', value);

        if(!contact) {
          return null;
        }

        let orgs = contact.get('json.memberOfOrganization');
        _contacts.push(value);

        if(orgs && orgs.length) {
          orgs.forEach(itm => {
            if(conts.get('contacts').findBy('contactId', itm)) {
              _contacts.push(itm);
            }
          });
        }
      }

      return value;
    };

    let cleaner = this.get('cleaner');
    let clean = cleaner.clean(get(rec, 'json'));

    this.injectCitations(clean);

    let json = JSON.parse(JSON.stringify(cleaner.clean(clean), _replacer));
    let contacts = this.get('store')
      .peekAll('contact')
      .mapBy('json');

    json.contact = contacts.filter((item) => {
      return _contacts.includes(get(item, 'contactId'));
    });

    if(unImplemented) {
      unImplemented.forEach((path) => {
        let array = isArray(path);
        let target = array ? get(json, path[0]) : get(json, path);

        if(target) {
          if(array) {
            target.forEach((item) => {
              set(item, path[1], undefined);
            });

            return;
          }

          set(json, path, undefined);
        }

      });
    }


    return asText ? JSON.stringify(cleaner.clean(json)) : cleaner.clean(
      json);
  },

  validateRecord(record) {
    validator.validate('schema', this.formatRecord(record));

    return validator;
  },

  validateContact(contact) {
    validator.validate('contact', contact.get('cleanJson'));

    return validator;
  },

  validateDictionary(dictionary) {
    validator.validate('dataDictionary', dictionary.get('cleanJson').dataDictionary);

    return validator;
  }
});
