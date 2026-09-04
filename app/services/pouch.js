import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import RSVP from 'rsvp';
import { guidFor } from '@ember/object/internals';

export const POUCH_TYPES = {
  RECORD: 'record',
  CONTACT: 'contact',
  DICTIONARY: 'dictionary'
}

export const TITLE_LABELS = {
  [POUCH_TYPES.RECORD]: 'Metadata Records',
  [POUCH_TYPES.CONTACT]: 'Contacts',
  [POUCH_TYPES.DICTIONARY]: 'Dictionaries'
}

export const NAME_KEYS = {
  [POUCH_TYPES.RECORD]: 'title',
  [POUCH_TYPES.CONTACT]: 'name',
  [POUCH_TYPES.DICTIONARY]: 'title'
}

export const ID_KEYS = {
  [POUCH_TYPES.RECORD]: 'recordId',
  [POUCH_TYPES.CONTACT]: 'contactId',
  [POUCH_TYPES.DICTIONARY]: 'dictionaryId'
}

/**
 * record/contact/dictionary all live directly in the local Pouch db now
 * (see app/adapters/{record,contact,dictionary}.js) - there's no separate
 * pouch-record/pouch-contact/pouch-dictionary doc to keep in sync with.
 * This service's job is now just: which records are flagged with
 * `syncEnabled` (replicated to a remote CouchDB by services/couch.js), and
 * driving the sync/list & sync/import UI off of that flag.
 */
export default class PouchService extends Service {
  @service store;
  @service flashMessages;
  @service router;
  @tracked bulkAdding = false;
  @tracked pouchModels = null;
  @tracked options = {};

  async setup() {
    this.pouchModels = await this.loadPouchModels();
    await this.setupOptions();
  }

  async setupOptions() {
    const promises = this.pouchModels.map(async (pm) => {
      const options = await this.loadFilteredOptions(pm.meta.type);
      this.options[pm.meta.type] = options;
    });
    await Promise.all(promises);
  }

  async loadPouchModels() {
    let promises = [
      this.store.findAll('record', {
        reload: true
      }),
      this.store.findAll('contact', {
        reload: true
      }),
      this.store.findAll('dictionary', {
        reload: true
      })
    ];

    const meta = new PouchMeta();
    meta.forEach(pm => pm.columns = COLUMNS);

    // findAll()'s result is a reactive array that rejects arbitrary property
    // writes (e.g. `item.meta = ...`), so the per-type metadata is carried
    // alongside the list in a wrapper object instead of being glued onto the
    // array itself. The sync/list table only shows records currently
    // syncing (matching how this looked before the collapse, when it only
    // ever saw the linked pouch-record/etc. docs); records not yet flagged
    // stay in `options` below, for md-pouch-add's picker.
    let mapFn = function (item, id) {
      meta[id].listId = guidFor(item);

      return { list: item.filter((record) => record.syncEnabled), meta: meta[id] };
    };

    return await RSVP.map(promises, mapFn);
  }

  async loadFilteredOptions(type) {
    const storeData = await this.store.findAll(type, { reload: true });
    // Records not yet flagged for sync
    return storeData.filter((record) => !record.syncEnabled);
  }

  async createPouchRecord(type, id) {
    const record = await this.store.findRecord(type, id);
    record.syncEnabled = true;
    return await record.save();
  }

  async bulkCreatePouchRecords(meta, records) {
    this.bulkAdding = true;
    const promises = records.map(async (record) => {
      try {
        return await this.createPouchRecord(meta.type, record.id);
      } catch(e) {
        return false;
      }
    });
    const created = await Promise.all(promises);
    this.handleBulkSave(meta, created);
    this.bulkAdding = false;
  }

  handleBulkSave(meta, records) {
    let errorCount = 0;
    let successCount = 0;
    records.forEach(r => r ? successCount++ : errorCount++);
    this.router.transitionTo('sync.list');
    if (successCount) {
      this.flashMessages.success(`Successfully imported ${successCount} ${meta.list}`);
    }
    if (errorCount) {
      this.flashMessages.danger(`Error importing ${errorCount} ${meta.list}`);
    }
  }

  async deletePouchRecord(record) {
    record.syncEnabled = false;
    return await record.save();
  }
}

const ACTIONS_COLUMN = {
  title: 'Actions',
  className: 'md-actions-column',
  component: 'control/md-pouch-record-table/remove-sync',
}

const COLUMNS = [{
  propertyName: 'title',
  title: 'Title'
}, {
  propertyName: 'id',
  title: 'ID'
},
  ACTIONS_COLUMN,
]


export const PouchMeta = function() {
  return [{
    type: POUCH_TYPES.RECORD,
    list: 'records',
    title: TITLE_LABELS[POUCH_TYPES.RECORD],
    pouchTitle: `Pouch ${TITLE_LABELS[POUCH_TYPES.RECORD]}`,
    icon: 'file-o',
  }, {
    type: POUCH_TYPES.CONTACT,
    list: 'contacts',
    title: TITLE_LABELS[POUCH_TYPES.CONTACT],
    pouchTitle: `Pouch ${TITLE_LABELS[POUCH_TYPES.CONTACT]}`,
    icon: 'users',
  }, {
    type: POUCH_TYPES.DICTIONARY,
    list: 'dictionaries',
    title: TITLE_LABELS[POUCH_TYPES.DICTIONARY],
    pouchTitle: `Pouch ${TITLE_LABELS[POUCH_TYPES.DICTIONARY]}`,
    icon: 'book',
  }];
}
