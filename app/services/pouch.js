import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';
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

export default class PouchService extends Service {
  @service store;
  @tracked options = {};

  async loadOptions() {
    // TODO - Refactor
    const newOptions = {};
    newOptions[POUCH_TYPES.RECORD] = await this.mapOptions(POUCH_TYPES.RECORD);
    newOptions[POUCH_TYPES.CONTACT] = await this.mapOptions(POUCH_TYPES.CONTACT);
    newOptions[POUCH_TYPES.DICTIONARY] = await this.mapOptions(POUCH_TYPES.DICTIONARY);
    this.options = newOptions;
  }

  async mapOptions(type) {
    const storeData = await this.store.peekAll(type);
    return storeData.map((item) => {
      return {
        id: item.id,
        name: item[NAME_KEYS[type]]
      }
    })
  }

  async savePouchModel(type, id) {
    const obj = await this.store.peekRecord(type, id);
    const objId = obj[ID_KEYS[type]];
    const objToSave = { id: objId, json: obj.cleanJson };
    // TODO - Refactor
    const pouchModel = this.store.createRecord(`pouch-${type}`, objToSave);
    await pouchModel.save();
  }

  async getOptions(type) {
    return await this.store.peekAll(type);
  }
}
