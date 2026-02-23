import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import EmObject, { computed, defineProperty } from '@ember/object';
import moment from 'moment';
import { exportData as localStorageExportData } from 'ember-local-storage/helpers/import-export';
import { exportSelectedData } from 'mdeditor/initializers/local-storage-export';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { singularize } from 'ember-inflector';

const modelTypes = [
  'records',
  'contacts',
  'dictionaries',
  'settings',
  'schemas',
  'custom-profiles',
  'profiles',
];

const fixLiabilityTypo = async (store) => {
  let records = store.peekAll('record');
  let promises = [];
  records.forEach((record) => {
    let jsonData = record.get('json');
    if (jsonData) {
      let metadata = jsonData.get('metadata');
      if (metadata?.resourceDistribution?.length > 0) {
        const liabilityStatement =
          metadata.resourceDistribution[0].liablityStatement;

        if (liabilityStatement) {
          metadata.resourceDistribution[0].liabilityStatement =
            liabilityStatement;
          delete metadata.resourceDistribution[0].liablityStatement;

          jsonData.set('metadata', metadata);
          promises.push(record.save());
        }
      }
    }
  });
  return Promise.all(promises);
};

export default class ExportRoute extends Route.extend(ScrollTo) {
  @service store;
  @service mdjson;
  @service settings;

  model() {
    return EmObject.create({
      records: this.modelFor('application'),
      settings: this.get('settings.data'),
    });
  }
  setupController(controller, model) {
    super.setupController(controller, model);

    defineProperty(
      this.controller,
      'hasSelected',
      computed(
        'model.{records.0.@each._selected,records.1.@each._selected,records.2.@each._selected,settings._selected}',
        function () {
          return (
            this.store.peekAll('record').filterBy('_selected').length +
              this.store.peekAll('contact').filterBy('_selected').length +
              this.store.peekAll('dictionary').filterBy('_selected').length +
              this.store.peekAll('setting').filterBy('_selected').length >
            0
          );
        }
      )
    );

    defineProperty(
      this.controller,
      'hasSelectedRecords',
      computed('model.records.0.@each._selected', function () {
        return this.store.peekAll('record').filterBy('_selected').length > 0;
      })
    );
  }

  columns = EmObject.create({
    record: [
      { propertyName: 'title', title: 'Title' },
      { propertyName: 'defaultType', title: 'Type' },
      { propertyName: 'recordId', title: 'ID' },
    ],
    contact: [
      { propertyName: 'title', title: 'Title' },
      { propertyName: 'defaultOrganization', title: 'Organization' },
      {
        propertyName: 'json.electronicMailAddress.0',
        title: 'E-mail',
      },
      { propertyName: 'contactId', title: 'ID' },
    ],
    dictionary: [
      { propertyName: 'title', title: 'Title' },
      { propertyName: 'json.dataDictionary.subject', title: 'Type' },
      { propertyName: 'dictionaryId', title: 'ID' },
    ],
  });

  // TODO: refactor this method to inclucde {attributes: {json: {}, dateUpdate:''}} in the modelTypes array
  processExportData(exportData) {
    let resultObject;

    try {
      resultObject = JSON.parse(exportData._result);

      resultObject.data = resultObject.data.map((item) => {
        if (item.type === 'dictionaries' && item.attributes?.json) {
          // Parse the 'json' string to access the dictionary

          let jsonData = JSON.parse(item.attributes.json);

          // Remove the `dataDictionary` wrapper if it exists
          if (jsonData.dataDictionary) {
            jsonData = { ...jsonData, ...jsonData.dataDictionary };
            delete jsonData.dataDictionary;
          }

          // Update the item's 'json' string
          item.attributes.json = JSON.stringify(jsonData);
        }

        // Handle settings migration from 'catalog' to 'publisher' in publishOptions
        if (item.type === 'settings' && item.attributes?.publishOptions) {
          let publishOptions = item.attributes.publishOptions;

          if (!Array.isArray(publishOptions)) {
            publishOptions = [];
          }

          // Migrate legacy 'catalog' field to new 'publisher' field for each publish option
          publishOptions = publishOptions.map((option) => {
            if (option.catalog && !option.publisher) {
              option.publisher = option.catalog;
              delete option.catalog;
            }

            // Migrate legacy endpoint fields to publisherEndpoint
            if (!option.publisherEndpoint) {
              if (option['sb-publishEndpoint']) {
                option.publisherEndpoint = option['sb-publishEndpoint'];
                delete option['sb-publishEndpoint'];
              } else if (option['couchdb-url']) {
                option.publisherEndpoint = option['couchdb-url'];
                delete option['couchdb-url'];
              } else {
                option.publisherEndpoint =
                  option.publisher === 'ScienceBase'
                    ? 'https://api.sciencebase.gov/sbmd-service/'
                    : '';
              }
            } else {
              // Remove old fields even if publisherEndpoint exists
              if (option['sb-publishEndpoint']) {
                delete option['sb-publishEndpoint'];
              }
              if (option['couchdb-url']) {
                delete option['couchdb-url'];
              }
            }

            return option;
          });

          item.attributes.publishOptions = publishOptions;
        }

        // Remove all PouchDB relationships
        delete item.relationships;

        return item;
      });

      // Re-serialize the modified object back to JSON
      exportData._result = JSON.stringify(resultObject);
    } catch (error) {
      console.error('Error processing export data:', error);
    }
    return exportData;
  }

  @action
  exportData() {
    fixLiabilityTypo(this.store).then(() => {
      const modifiedData = this.processExportData(
        localStorageExportData(this.store, modelTypes)
      );
      window.saveAs(
        new Blob([modifiedData._result], {
          type: 'application/json;charset=utf-8',
        }),
        `mdeditor-${moment.utc().format('YYYYMMDD-HHmmss')}.json`
      );
    });
  }

  @action
  exportSelectedData(asMdjson) {
    fixLiabilityTypo(this.store).then(() => {
      if (asMdjson) {
        let records = this.store
          .peekAll('record')
          .filterBy('_selected')
          .map((item) => this.mdjson.formatRecord(item, false, true));

        window.saveAs(
          new Blob([JSON.stringify(records)], {
            type: 'application/json;charset=utf-8',
          }),
          `mdjson-${moment.utc().format('YYYYMMDD-HHmmss')}.json`
        );
      } else {
        let filterIds = {};

        modelTypes.forEach((type) => {
          let singularType = singularize(type);
          filterIds[singularType] = this.store
            .peekAll(singularType)
            .filterBy('_selected')
            .map((item) =>
              item && typeof item.get === 'function' ? item.get('id') : item.id
            );
        });

        // Export schemas with settings
        if (filterIds.setting.length) {
          filterIds.schema = this.store
            .peekAll('schema')
            .map((item) =>
              item && typeof item.get === 'function' ? item.get('id') : item.id
            );
          filterIds.profile = this.store
            .peekAll('profile')
            .map((item) =>
              item && typeof item.get === 'function' ? item.get('id') : item.id
            );
          filterIds['custom-profile'] = this.store
            .peekAll('custom-profile')
            .map((item) =>
              item && typeof item.get === 'function' ? item.get('id') : item.id
            );
        }
        const modifiedSelectedData = this.processExportData(
          exportSelectedData(this.store, modelTypes, { filterIds })
        );

        window.saveAs(
          new Blob([modifiedSelectedData._result], {
            type: 'application/json;charset=utf-8',
          }),
          `mdeditor-${moment.utc().format('YYYYMMDD-HHmmss')}.json`
        );
      }
    });
  }

  @action
  getColumns(type) {
    return this.columns.get(type);
  }

  @action
  hasSelected() {
    return this.hasSelected;
  }
}
