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
export const POUCH_PREFIX = 'pouch-';

export const pouchPrefix = (type) => `${POUCH_PREFIX}${type}`;

export const camelizedPouchPrefix = (type) => Ember.String.camelize(pouchPrefix(type));

export const unPouchPrefix = (pouchType) => pouchType.replace(POUCH_PREFIX, '');

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

    const meta = new PouchMeta();
    meta.forEach(pm => pm.columns = COLUMNS);

    let mapFn = function (item, id) {
      meta[id].listId = guidFor(item);
      // Avoid updating meta in case it's already set and being tracked
      if (!item.meta) {
        item.meta = meta[id];
      }

      return item;
    };

    return await RSVP.map(promises, mapFn);
  }

  async loadFilteredOptions(type) {
    const storeData = await this.store.findAll(type, { reload: true });
    // Filter out records that don't have associated pouch records
    return storeData
      .filter((record) => !record[camelizedPouchPrefix(type)])
  }

  async createPouchRecord(type, id) {
    const record = await this.store.findRecord(type, id);
    const objId = record[ID_KEYS[type]];
    const pouchObjToSave = {
      id: objId,
      json: record.cleanJson
    };
    // First save related record
    const pouchModel = this.store.createRecord(pouchPrefix(type), pouchObjToSave);
    record[camelizedPouchPrefix(type)] = pouchModel;
    await record.save();
    // Then save pouch record
    return await pouchModel.save();
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
    if (!!successCount) {
      this.flashMessages.success(`Successfully imported ${successCount} ${meta.list}`);
    }
    if (!!errorCount) {
      this.flashMessages.danger(`Error importing ${errorCount} ${meta.list}`);
    }
  }

  async updatePouchRecord(relatedRecord) {
    let pouchRecord;
    if (relatedRecord.pouchRecord) {
      pouchRecord = relatedRecord.pouchRecord;
    }
    if (relatedRecord.pouchContact) {
      pouchRecord = relatedRecord.pouchContact;
    }
    if (relatedRecord.pouchDictionary) {
      pouchRecord = relatedRecord.pouchDictionary;
    }
    // Only update the pouch record if one exists
    if (!!pouchRecord) {
      pouchRecord.json = relatedRecord.cleanJson;
      return await pouchRecord.save();
    }
  }

  async deletePouchRecord(pouchRecord) {
    // First delete pouch record
    await pouchRecord.destroyRecord();
    // Then remove related pouch record
    const relatedRecord = await this.queryRelatedRecord(pouchRecord);
    if (relatedRecord) {
      relatedRecord[Ember.String.camelize(pouchRecord.constructor.modelName)] = null;
      await relatedRecord.save();
    }
    return await pouchRecord.unloadRecord();
  }

  async queryRelatedRecord(pouchRecord) {
    const unPouchedType = unPouchPrefix(pouchRecord.constructor.modelName);
    const camelizedRel = Ember.String.camelize(pouchRecord.constructor.modelName);
    return await this.store.queryRecord(unPouchedType, { filter: { [camelizedRel]: pouchRecord.id } });
  }

  async createRelatedRecord(pouchRecord) {
    // First create the related record
    const unPouchedType = unPouchPrefix(pouchRecord.constructor.modelName);
    const relatedRecord = this.store.createRecord(unPouchedType, { json: pouchRecord.json });
    // Then add the related pouch record
    relatedRecord[Ember.String.camelize(pouchRecord.constructor.modelName)] = pouchRecord;
    return await relatedRecord.save();
  }

  async updateRelatedRecord(pouchRecord, relatedRecord) {
    relatedRecord.json = pouchRecord.json;
    return await relatedRecord.save();
  }

  checkIfPouchRecordChanged(pouchRecord, relatedRecord) {
    // Pouch record stores data as a JSON object, so needs to be stringified
    const stringifiedPouchRecord = JSON.stringify(pouchRecord.serialize().json);
    // Related record stores data as a stringified JSON object, so compare it directly
    const stringifiedRelatedRecord = relatedRecord.serialize().data.attributes.json;
    return stringifiedPouchRecord === stringifiedRelatedRecord;
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

const COLUMNS = [{
  propertyName: 'title',
  title: 'Title'
}, {
  propertyName: 'id',
  title: 'ID'
},
  ACTIONS_COLUMN,
  POUCH_ACTIONS_COLUMN
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
