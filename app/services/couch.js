import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import PouchDB from 'ember-pouch/pouchdb';

export default class CouchService extends Service {
  @service store;
  @service flashMessages;

  // Logged in state
  @tracked loggedIn = false;
  @tracked username = null;
  @tracked remoteName = null;
  // DB instance data
  localDb = null;
  remoteDb = null;
  // DB data Loading state
  @tracked replicationState = null;
  @tracked replicationMessage = null;
  @tracked replicationInfo = null;
  // Couch model data
  couch = null;

  // Changes made to documents
  @tracked lastUpdated = [];

  async setup() {
    const adapter = this.store.adapterFor('pouch-base');
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
      this.handleError(e);
    }
  }

  @action
  async login(remoteUrl, remoteName, username, password) {
    remoteUrl = this.cleanDbUrl(remoteUrl);
    try {
      this.setRemoteDb(remoteUrl, remoteName);
      const user = await this.remoteDb.login(username, password);
      if (user.ok) {
        this.setLoggedInUser(user.name);
        this.setCouch(remoteUrl, remoteName);
        this.flashMessages.success(`Logged in as ${this.username}`);
      }
    } catch(e) {
      this.handleError(e);
    }
  }

  @action
  async logout() {
    try {
      await this.remoteDb.logout();
      this.loggedIn = false;
      this.flashMessages.success(`Logged out ${this.username}`);
      this.username = null;
      this.remoteName = null;
      this.remoteDb = null;
      this.couch = null;
    } catch(e) {
      this.handleError(e);
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
      this.handleError(e);
    }
  }

  // Helper for removing the trailing slash from the remote db url
  cleanDbUrl(url) {
    const hasSlash = url.slice(-1) === '/';
    return hasSlash ? url.substring(0, url.length - 1) : url;
  }

  setRemoteDb(remoteUrl, remoteName) {
    this.remoteDb = new PouchDB(`${remoteUrl}/${remoteName}`);
    this.remoteName = this.remoteDb.name;
  }

  setLoggedInUser(name) {
    this.username = name;
    this.loggedIn = true;
  }

  handleError(e) {
    console.error(e);
    const errMsg = e.message || e.reason || e.name || e.error;
    this.flashMessages.danger(`Error${errMsg ? `: ${errMsg}` : ''}`);
  }

  @action
  push() {
    this.replicationState = 'Pushing';
    this.localDb.replicate.to(this.remoteDb)
      .on('complete', (info) => {
        this.replicationState = null;
        this.replicationInfo = info;
      })
      .on('error', (err) => {
        this.handleError(err);
      })
  }

  @action
  pull() {
    this.replicationState = 'Pulling';
    this.localDb.replicate.from(this.remoteDb)
      // For now, only listen for changes to local PouchDB database
      .on('change', (info) => {
        const { docs } = info;
        this.lastUpdated = docs.map((doc) => this.extractPouchId(doc._id));
      })
      .on('complete', (info) => {
        this.replicationState = null;
        this.replicationInfo = info;
      })
      .on('error', (err) => {
        this.handleError(err);
      })
  }

  @action
  sync() {
    this.replicationState = 'Syncing';
    this.localDb.sync(this.remoteDb)
      .on('complete', (info) => {
        this.replicationState = null;
        this.replicationInfo = info;
      })
      .on('error', (err) => {
        this.handleError(err);
      })
  }

  // Helper function to take the raw pouchId (e.g. pouchRecord_2_USGS:ASC365)
  // and extract its id ('USGS:ASC365')
  async extractPouchId(rawId) {
    const [ camelizedType ] = rawId.split('_');
    const dasherizedType = Ember.String.dasherize(camelizedType);
    const adapter = this.store.adapterFor(dasherizedType);
    const relationalPouch = adapter.db.rel;
    const { id } = relationalPouch.parseDocID(rawId);
    return id;
  }
}
