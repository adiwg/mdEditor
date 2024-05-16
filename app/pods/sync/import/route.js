import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import { PouchMeta, pouchPrefix } from 'mdeditor/services/pouch';

export default class SyncImportRoute extends Route {
  @service pouch;

  async model(params) {
    const type = params.import_id;
    await this.store.findAll(pouchPrefix(type), { reload: true });
    const options = await this.pouch.loadFilteredOptions(type);
    const meta = new PouchMeta().find(m => m.type === type);
    meta.columns = COLUMNS;
    return { meta, options };
  }
}

const COLUMNS = [{
  propertyName: 'name',
  title: 'Title'
}, {
  propertyName: 'id',
  title: 'ID'
}]
