import { Adapter } from 'ember-pouch';
import { initDb } from 'mdeditor/adapters/pouch-base';

export default class PouchRecordAdapter extends Adapter {
  db = initDb();
}