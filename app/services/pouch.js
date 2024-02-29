import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export const POUCH_TYPES = {
  RECORD: 'record',
  CONTACT: 'contact',
  DICTIONARY: 'dictionary'
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
  @tracked options = {};

  async loadOptions(type) {
    const storeData = await this.store.findAll(type, { reload: true });
    await this.store.findAll(pouchPrefix(type)); // Need to load related records first
    return storeData
      // Filter out records that don't have associated pouch records
      .filter((record) => !record[camelizedPouchPrefix(type)])
      .map((item) => ({ id: item.id, name: item[NAME_KEYS[type]]}))
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

  async updatePouchRecord(pouchRecord, relatedRecord) {
    pouchRecord.json = relatedRecord.cleanJson;
    return await pouchRecord.save();
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

  async getOptions(type) {
    return await this.store.peekAll(type);
  }
}
