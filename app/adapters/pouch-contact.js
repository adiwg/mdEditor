import { Adapter } from 'ember-pouch';
import { initDb, unloadedDocumentChanged } from 'mdeditor/adapters/pouch-base';
import classic from 'ember-classic-decorator';

@classic
export default class PouchContactAdapter extends Adapter {
  db = initDb();

  recordTypeName = 'pouchContact';

  unloadedDocumentChanged = unloadedDocumentChanged.bind(this);
}