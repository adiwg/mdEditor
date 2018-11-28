import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import EmObject, {
  computed,
  defineProperty,
  get
} from '@ember/object';
import moment from 'moment';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { singularize } from 'ember-inflector';

const modelTypes = ['records', 'contacts', 'dictionaries', 'settings'];

export default Route.extend(ScrollTo, {
  mdjson: service(),
  settings: service(),
  model() {
    //const store = this.get('store');

    return EmObject.create({
      records: this.modelFor('application'),
      settings: this.get('settings.data')
    });

  },
  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    // Implement your custom setup after
    defineProperty(this.controller, 'hasSelected', computed(
      'model.{records.0.@each._selected,records.1.@each._selected,records.2.@each._selected,settings._selected}',
      function() {
        return(this.store.peekAll('record').filterBy('_selected').get(
            'length') +
          this.store.peekAll('contact').filterBy('_selected').get(
            'length') +
          this.store.peekAll('dictionary').filterBy('_selected').get(
            'length') +
          this.store.peekAll('setting').filterBy('_selected').get(
            'length')) > 0;

      }));
    defineProperty(this.controller, 'hasSelectedRecords', computed(
      'model.records.0.@each._selected',
      function() {
        return this.store.peekAll('record').filterBy('_selected').get(
          'length') > 0;

      }));
  },

  columns: EmObject.create({
    record: [{
      propertyName: 'title',
      title: 'Title'
    }, {
      propertyName: 'defaultType',
      title: 'Type'
    }, {
      propertyName: 'recordId',
      title: 'ID'
    }, ],
    contact: [{
      propertyName: 'title',
      title: 'Title'
    }, {
      propertyName: 'defaultOrganization',
      title: 'Organization'
    }, {
      propertyName: 'json.electronicMailAddress.firstObject',
      title: 'E-mail'
    }, {
      propertyName: 'contactId',
      title: 'ID'
    }],
    dictionary: [{
      propertyName: 'title',
      title: 'Title'
    }, {
      propertyName: 'defaultType',
      title: 'Type'
    }, {
      propertyName: 'dictionaryId',
      title: 'ID'
    }]
  }),
  actions: {
    exportData() {
      this.get('store').exportData(
        modelTypes, {
          download: true,
          filename: `mdeditor-${moment().format('YYYYMMDD-HHMMSS')}.json`
        }
      );
    },
    exportSelectedData(asMdjson) {
      let store = this.get('store');

      if(asMdjson) {
        let records = store.peekAll('record').filterBy('_selected').map((
          itm) => {
          return get(this, 'mdjson').formatRecord(itm);
        });

        window.saveAs(
          new Blob([JSON.stringify(records)], {
            type: 'application/json;charset=utf-8'
          }),
          `mdjson-${moment().format('YYYYMMDD-HHMMSS')}.json`
        );

      } else {
        let filterIds = {};

        modelTypes.forEach((type) => {
          let t = singularize(type);

          filterIds[t] = store.peekAll(t).filterBy('_selected').mapBy(
            'id');
        });

        store.exportSelectedData(
          modelTypes, {
            download: true,
            filename: `mdeditor-${moment().format('YYYYMMDD-HHMMSS')}.json`,
            filterIds: filterIds
          }
        );
      }
    },
    getColumns(type) {
      return get(this, 'columns').get(type);
    },
    hasSelected() {
      return get(this, 'hasSelected');
    }
  }
});
