import { Adapter } from 'ember-pouch';
import { initDb, unloadedDocumentChanged } from 'mdeditor/adapters/pouch-base';
import classic from 'ember-classic-decorator';

@classic
export default class PouchDictionaryAdapter extends Adapter {
  db = initDb();

  recordTypeName = 'pouchDictionary';

  unloadedDocumentChanged = unloadedDocumentChanged.bind(this);
}