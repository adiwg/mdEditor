import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import { POUCH_TYPES, pouchPrefix } from 'mdeditor/services/pouch';

const POUCH_TYPES_PLURAL_MAP ={
  [POUCH_TYPES.RECORD]: 'Metadata Records',
  [POUCH_TYPES.CONTACT]: 'Contacts',
  [POUCH_TYPES.DICTIONARY]: 'Dictionaries'
}

export default class SyncImportRoute extends Route {
  @service pouch;

  async model(params) {
    const type = params.import_id;
    await this.store.findAll(pouchPrefix(type), { reload: true });
    const options = await this.pouch.loadOptions(type);
    return {
      plural: POUCH_TYPES_PLURAL_MAP[type],
      options
    }
  }
}
