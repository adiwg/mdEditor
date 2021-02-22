//TODO: figure out a native class conversion for this one

import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import EmObject, { computed, defineProperty } from '@ember/object';
import moment from 'moment';
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

export default Route.extend(ScrollTo, {
  mdjson: service(),
  settings: service(),
  model() {
    //const store = this.get('store');

    return EmObject.create({
      records: this.modelFor('application'),
      settings: this.settings.data,
    });
  },
  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    // Implement your custom setup after
    defineProperty(
      this.controller,
      'hasSelected',
      computed(
        'model.{records.0.@each._selected,records.1.@each._selected,records.2.@each._selected,settings._selected}',
        'store',
        function () {
          return (
            this.store.peekAll('record').filterBy('_selected').get('length') +
              this.store
                .peekAll('contact')
                .filterBy('_selected')
                .get('length') +
              this.store
                .peekAll('dictionary')
                .filterBy('_selected')
                .get('length') +
              this.store
                .peekAll('setting')
                .filterBy('_selected')
                .get('length') >
            0
          );
        }
      )
    );
    defineProperty(
      this.controller,
      'hasSelectedRecords',
      computed('model.records.0.@each._selected', 'store', function () {
        return (
          this.store.peekAll('record').filterBy('_selected').get('length') > 0
        );
      })
    );
  },

  columns: EmObject.create({
    record: [
      {
        propertyName: 'title',
        title: 'Title',
      },
      {
        propertyName: 'defaultType',
        title: 'Type',
      },
      {
        propertyName: 'recordId',
        title: 'ID',
      },
    ],
    contact: [
      {
        propertyName: 'title',
        title: 'Title',
      },
      {
        propertyName: 'defaultOrganization',
        title: 'Organization',
      },
      {
        propertyName: 'json.electronicMailAddress.firstObject',
        title: 'E-mail',
      },
      {
        propertyName: 'contactId',
        title: 'ID',
      },
    ],
    dictionary: [
      {
        propertyName: 'title',
        title: 'Title',
      },
      {
        propertyName: 'defaultType',
        title: 'Type',
      },
      {
        propertyName: 'dictionaryId',
        title: 'ID',
      },
    ],
  }),
  actions: {
    exportData() {
      this.store.exportData(modelTypes, {
        download: true,
        filename: `mdeditor-${moment().format('YYYYMMDD-HHMMSS')}.json`,
      });
    },
    exportSelectedData(asMdjson) {
      let store = this.store;

      if (asMdjson) {
        let records = store
          .peekAll('record')
          .filterBy('_selected')
          .map((itm) => {
            return this.mdjson.formatRecord(itm);
          });

        window.saveAs(
          new Blob([JSON.stringify(records)], {
            type: 'application/json;charset=utf-8',
          }),
          `mdjson-${moment().format('YYYYMMDD-HHMMSS')}.json`
        );
      } else {
        let filterIds = {};

        modelTypes.forEach((type) => {
          let t = singularize(type);

          filterIds[t] = store.peekAll(t).filterBy('_selected').mapBy('id');
        });

        //export schemas with settings
        if (filterIds.setting.length) {
          filterIds['schema'] = store.peekAll('schema').mapBy('id');
          filterIds['profile'] = store.peekAll('profile').mapBy('id');
          filterIds['custom-profile'] = store
            .peekAll('custom-profile')
            .mapBy('id');
        }

        store.exportSelectedData(modelTypes, {
          download: true,
          filename: `mdeditor-${moment().format('YYYYMMDD-HHMMSS')}.json`,
          filterIds: filterIds,
        });
      }
    },
    getColumns(type) {
      return this.columns.get(type);
    },
    hasSelected() {
      return this.hasSelected;
    },
  },
});
