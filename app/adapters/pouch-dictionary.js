import { Adapter } from 'ember-pouch';
import { initDb, unloadedDocumentChanged } from 'mdeditor/adapters/pouch-base';

export default class PouchDictionaryAdapter extends Adapter {
  db = initDb();

  recordTypeName = 'pouchDictionary';

  unloadedDocumentChanged = unloadedDocumentChanged.bind(this);
}