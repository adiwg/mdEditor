import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';

import { POUCH_TYPES } from 'mdeditor/services/pouch';

export default class SyncListRoute extends Route {
  @service pouch;

  async beforeModel() {
    await this.pouch.loadOptions();
  }

  async model() {
    let promises = [
      this.store.findAll('pouch-record', {
        reload: true
      }),
      this.store.findAll('pouch-contact', {
        reload: true
      }),
      this.store.findAll('pouch-dictionary', {
        reload: true
      })
    ];

    const meta = [{
      type: POUCH_TYPES.RECORD,
      list: 'records',
      title: 'Metadata Records',
      icon: 'file-o',
      options: this.pouch.options[POUCH_TYPES.RECORD],
      columns: COLUMNS[POUCH_TYPES.RECORD]
    }, {
      type: POUCH_TYPES.CONTACT,
      list: 'contacts',
      title: 'Contacts',
      icon: 'users',
      options: this.pouch.options[POUCH_TYPES.CONTACT],
      columns: COLUMNS[POUCH_TYPES.CONTACT]
    }, {
      type: POUCH_TYPES.DICTIONARY,
      list: 'dictionaries',
      title: 'Dictionaries',
      icon: 'book',
      options: this.pouch.options[POUCH_TYPES.DICTIONARY],
      columns: COLUMNS[POUCH_TYPES.DICTIONARY]
    }];

    let mapFn = function (item, id) {
      meta[id].listId = guidFor(item);
      item.meta = meta[id];

      return item;
    };

    return await RSVP.map(promises, mapFn);
  }
}

const COLUMNS = {
  record: [{
    propertyName: 'data.json.title',
    title: 'Title'
  }, {
    propertyName: 'data.json.defaultType',
    title: 'Type'
  }, {
    propertyName: 'data.json.recordId',
    title: 'ID'
  }, ],
  contact: [{
    propertyName: 'data.json.title',
    title: 'Title'
  }, {
    propertyName: 'data.json.defaultOrganization',
    title: 'Organization'
  }, {
    propertyName: 'data.json.json.electronicMailAddress.firstObject',
    title: 'E-mail'
  }, {
    propertyName: 'data.json.contactId',
    title: 'ID'
  }],
  dictionary: [{
    propertyName: 'data.json.title',
    title: 'Title'
  }, {
    propertyName: 'data.json.defaultType',
    title: 'Type'
  }, {
    propertyName: 'data.json.dictionaryId',
    title: 'ID'
  }]
}