import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import PouchDB from 'ember-pouch/pouchdb';

export default class CouchService extends Service {
  @service store;

  // Logged in state
  @tracked loggedIn = false;
  @tracked username = null;
  // DB instance data
  localDb = null;
  remoteDb = null;
  // DB data Loading state
  @tracked replicationState = null;
  @tracked replicationMessage = null;
  // Couch model data
  couch = null;

  async setup() {
    const adapter = this.store.adapterFor('application');
    this.localDb = adapter.db;
    // Check to see if they have a remote name and url saved
    // If they do, then getSession to see if their cookie is still valid
    // If valid, then display remote url, remote name, and user name
    try {
      const couch = await this.getCouch();
      if (couch) {
        this.couch = couch;
        this.setRemoteDb(this.couch.remoteUrl, this.couch.remoteName);
        const session = await this.remoteDb.getSession();
        if (session.userCtx.name) {
          this.setLoggedInUser(session.userCtx.name);
        }
      }
    } catch(e) {
      console.log(e);
    }
  }

  @action
  async login(remoteUrl, remoteName, username, password) {
    try {
      const user = await this.remoteDb.login(username, password);
      if (user.ok) {
        this.setLoggedInUser(user.name);
        this.setCouch(remoteUrl, remoteName);
        this.setRemoteDb(remoteUrl, remoteName);
      }
    } catch(e) {
      console.log(e);
    }
  }

  async getCouch() {
    const store = await this.store.findAll('couch');
    const couch = store.get('firstObject');
    return couch;
  }

  async setCouch(remoteUrl, remoteName) {
    const couch = await this.getCouch();
    try {
      // Update
      if (couch) {
        couch.remoteUrl = remoteUrl;
        couch.remoteName = remoteName;
        await couch.save()
      }
      // Create
      else {
        const couch = this.store.createRecord('couch', { remoteUrl, remoteName });
        await couch.save();
      }
    } catch(e) {
      console.log(e);
    }
  }

  setRemoteDb(remoteUrl, remoteName) {
    this.remoteDb = new PouchDB(`${remoteUrl}/${remoteName}`);
  }

  setLoggedInUser(name) {
    this.username = name;
    this.loggedIn = true;
  }

  @action
  push() {
    this.replicationState = 'Pushing';
    this.localDb.replicate.to(this.remoteDb)
      .on('complete', () => {
        this.displayMessage(this.replicationState);
        this.replicationState = null;
      })
      .on('error', (err) => {
        console.log(err);
      })
  }

  @action
  pull() {
    this.replicationState = 'Pulling';
    this.localDb.replicate.from(this.remoteDb)
      .on('complete', () => {
        this.displayMessage(this.replicationState);
        this.replicationState = null;
      })
      .on('error', (err) => {
        console.log(err);
      })
  }

  @action
  sync() {
    this.replicationState = 'Syncing';
    this.localDb.sync(this.remoteDb)
      .on('complete', () => {
        this.displayMessage(this.replicationState);
        this.replicationState = null;
      })
      .on('error', (err) => {
        console.log(err);
      })
  }

  displayMessage(type) {
    this.replicationMessage = `Done ${type}`;
    setTimeout(() => {
      this.replicationMessage = null;
    }, 2000);
  }
}
