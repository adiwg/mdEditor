import Controller from '@ember/controller';
import EmberObject, { action } from '@ember/object';
import moment from 'moment';
import { inject as service } from '@ember/service';
import { fixExportLiabilityTypo } from '../utils/md-fix-liability-typo';
import { singularize } from 'ember-inflector';

export default class ExportController extends Controller {
  @service store;
  @service mdjson;

  get hasSelected() {
    return (
      this.store.peekAll('record').filterBy('_selected').get('length') +
        this.store.peekAll('contact').filterBy('_selected').get('length') +
        this.store.peekAll('dictionary').filterBy('_selected').get('length') +
        this.store.peekAll('setting').filterBy('_selected').get('length') >
      0
    );
  }

  get hasSelectedRecords() {
    return this.store.peekAll('record').filterBy('_selected').get('length') > 0;
  }

  columns = EmberObject.create({
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
  });

  modelTypes = [
    'records',
    'contacts',
    'dictionaries',
    'settings',
    'schemas',
    'custom-profiles',
    'profiles',
  ];

  @action
  exportData() {
    fixLiabilityTypo(this.store).then(() => {
      this.store.exportData(modelTypes, {
        download: true,
        filename: `mdeditor-${moment().format('YYYYMMDD-HHMMSS')}.json`,
      });
    });
  }

  @action
  exportSelectedData(asMdjson) {
    fixExportLiabilityTypo(this.store).then(() => {
      if (asMdjson) {
        let records = this.store
          .peekAll('record')
          .filterBy('_selected')
          .map((itm) => {
            return this.mdjson.formatRecord(itm);
          });

        window.saveAs(
          new Blob([JSON.stringify(records)], {
            type: 'application/json;charset=utf-8',
          }),
          `mdjson-${moment().format('YYYYMMDD-HHMMSS')}.json`,
        );
      } else {
        let filterIds = {};

        this.modelTypes.forEach((type) => {
          let t = singularize(type);

          filterIds[t] = this.store
            .peekAll(t)
            .filterBy('_selected')
            .mapBy('id');
        });

        //export schemas with settings
        if (filterIds.setting.length) {
          filterIds['schema'] = this.store.peekAll('schema').mapBy('id');
          filterIds['profile'] = this.store.peekAll('profile').mapBy('id');
          filterIds['custom-profile'] = this.store
            .peekAll('custom-profile')
            .mapBy('id');
        }

        this.store.exportSelectedData(this.modelTypes, {
          download: true,
          filename: `mdeditor-${moment().format('YYYYMMDD-HHMMSS')}.json`,
          filterIds: filterIds,
        });
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
