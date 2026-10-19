import { Adapter } from 'ember-pouch';
import { initDb, unloadedDocumentChanged } from 'mdeditor/adapters/pouch-base';
import classic from 'ember-classic-decorator';

@classic
export default class PouchRecordAdapter extends Adapter {
  db = initDb();

  recordTypeName = 'pouchRecord';

  unloadedDocumentChanged = unloadedDocumentChanged.bind(this);
}