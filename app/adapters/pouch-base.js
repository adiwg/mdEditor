import PouchDB from 'ember-pouch/pouchdb';
import auth from 'pouchdb-authentication';
import { Adapter } from 'ember-pouch';

PouchDB.plugin(auth);

export const initDb = function() {
  return new PouchDB('md-pouch');
}

export function unloadedDocumentChanged(obj) {
  let recordTypeName = this.getRecordTypeName(this.store.modelFor(obj.type));
  this.db.rel.find(recordTypeName, obj.id).then((doc) => {
    this.store.pushPayload(recordTypeName, doc);
  });
}

/**
 * Note: Don't extend any sub-classes from this base class directly
 * as doing so will cause issues with the adapter in relational-pouch
 *
 * Instead, use the initDb function for assigning the correct PouchDB
 */
export default class PouchBaseAdapter extends Adapter {
  db = initDb();
}
