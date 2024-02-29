import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';

import { POUCH_TYPES } from 'mdeditor/services/pouch';

export default class SyncListRoute extends Route {
  @service pouch;

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
      title: 'PouchDB Metadata Records',
      icon: 'file-o',
      columns: COLUMNS[POUCH_TYPES.RECORD]
    }, {
      type: POUCH_TYPES.CONTACT,
      list: 'contacts',
      title: 'PouchDB Contacts',
      icon: 'users',
      columns: COLUMNS[POUCH_TYPES.CONTACT]
    }, {
      type: POUCH_TYPES.DICTIONARY,
      list: 'dictionaries',
      title: 'PouchDB Dictionaries',
      icon: 'book',
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

const ACTIONS_COLUMN = {
  title: 'Actions',
  className: 'md-actions-column',
  component: 'control/md-pouch-record-table/buttons',
}

const POUCH_ACTIONS_COLUMN = {
  title: 'Pouch Actions',
  className: 'md-actions-column',
  component: 'control/md-pouch-record-table/pouch-buttons',
}

const COLUMNS = {
  [POUCH_TYPES.RECORD]: [{
    propertyName: 'title',
    title: 'Title'
  }, {
    propertyName: 'recordId',
    title: 'ID'
  },
    ACTIONS_COLUMN,
    POUCH_ACTIONS_COLUMN
  ],
  [POUCH_TYPES.CONTACT]: [{
    propertyName: 'title',
    title: 'Title'
  }, {
    propertyName: 'contactId',
    title: 'ID'
  },
    ACTIONS_COLUMN,
    POUCH_ACTIONS_COLUMN
  ],
  [POUCH_TYPES.DICTIONARY]: [{
    propertyName: 'title',
    title: 'Title'
  }, {
    propertyName: 'dictionaryId',
    title: 'ID'
  },
    ACTIONS_COLUMN,
    POUCH_ACTIONS_COLUMN
  ]
}