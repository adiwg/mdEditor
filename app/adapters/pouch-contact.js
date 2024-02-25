import { Adapter } from 'ember-pouch';
import { initDb } from 'mdeditor/adapters/pouch-base';

export default class PouchContactAdapter extends Adapter {
  db = initDb();
}