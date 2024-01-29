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
  local = null;
  remote = null;
  // DB data Loading state
  @tracked replicationState = null;
  @tracked replicationMessage = null;

  @action
  async login(remoteUrl, remoteName, username, password) {
    const remote = new PouchDB(`${remoteUrl}/${remoteName}`, { skip_setup: true });
    try {
      const user = await remote.login(username, password);
      if (user.ok) {
        this.username = user.name;
        this.remote = remote;
        const adapter = this.store.adapterFor('application');
        this.local = adapter.db;
        this.loggedIn = true;
      }
    } catch(e) {
      console.log(e);
    }
  }

  @action
  push() {
    this.replicationState = 'Pushing';
    this.local.replicate.to(this.remote)
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
    this.local.replicate.from(this.remote)
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
    this.couch.sync(this.remote)
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
