import { Adapter } from 'ember-pouch';
import { initDb, unloadedDocumentChanged } from 'mdeditor/adapters/pouch-base';

export default class PouchContactAdapter extends Adapter {
  db = initDb();

  recordTypeName = 'pouchContact';

  unloadedDocumentChanged = unloadedDocumentChanged.bind(this);
}