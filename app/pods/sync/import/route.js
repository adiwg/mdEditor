import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import { PouchMeta } from 'mdeditor/services/pouch';

export default class SyncImportRoute extends Route {
  @service store;
  @service pouch;

  async model(params) {
    const type = params.import_id;
    const options = await this.pouch.loadFilteredOptions(type);
    const meta = new PouchMeta().find(m => m.type === type);
    meta.columns = COLUMNS;
    return { meta, options };
  }

  importAllData(model) {
    const { meta, options } = model;
    this.pouch.bulkCreatePouchRecords(meta, options);
  }

  async importSelectedData(model) {
    const { meta, options } = model;
    const selected = options.filter(o => !!o._selected);
    this.pouch.bulkCreatePouchRecords(meta, selected);
  }
}

const COLUMNS = [{
  propertyName: 'title',
  title: 'Title'
}, {
  propertyName: 'id',
  title: 'ID'
}]
