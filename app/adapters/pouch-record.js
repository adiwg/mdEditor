import { Adapter } from 'ember-pouch';
import { initDb, unloadedDocumentChanged } from 'mdeditor/adapters/pouch-base';

export default class PouchRecordAdapter extends Adapter {
  db = initDb();

  recordTypeName = 'pouchRecord';

  unloadedDocumentChanged = unloadedDocumentChanged.bind(this);
}