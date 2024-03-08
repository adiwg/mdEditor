import { Adapter } from 'ember-pouch';
import { initDb, unloadedDocumentChanged } from 'mdeditor/adapters/pouch-base';

export default class PouchRecordAdapter extends Adapter {
  db = initDb();

  unloadedDocumentChanged = unloadedDocumentChanged.bind(this);
}