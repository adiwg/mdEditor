import PouchDB from 'ember-pouch/pouchdb';
import auth from 'pouchdb-authentication';
import { Adapter } from 'ember-pouch';

PouchDB.plugin(auth);

const db = new PouchDB('md-pouch');

export default class PouchBaseAdapter extends Adapter {
  db = db;
}
