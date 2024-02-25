import { Adapter } from 'ember-pouch';
import { initDb } from 'mdeditor/adapters/pouch-base';

export default class PouchDictionaryAdapter extends Adapter {
  db = initDb();
}