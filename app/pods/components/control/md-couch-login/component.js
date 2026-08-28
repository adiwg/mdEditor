import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { next } from '@ember/runloop';

export default class CouchLoginComponent extends Component {
  @service couch;
  @service settings;

  // User data
  @tracked username = null;
  @tracked password = null;
  // DB data
  @tracked remoteUrl = null;
  @tracked remoteName = null;

  constructor() {
    super(...arguments);
    // Deferred with next() so the tracked writes below always land in a
    // render pass after this constructor's own initial render computation
    // has committed. `await this.settings.ready` can resolve as a microtask
    // that races with Glimmer's own render-commit microtask, which
    // otherwise intermittently throws "you attempted to update `remoteUrl`
    // ... but it had already been used previously in the same computation."
    next(this, this.loadDefaults);
  }

  async loadDefaults() {
    // The settings record loads asynchronously and may not be ready yet
    // (e.g. on a fresh page load of the sync route)
    if (!this.settings.data) {
      await this.settings.ready;
    }

    if (!this.settings.data || this.couch.loggedIn) {
      return;
    }

    const rawOptions = this.settings.data.publishOptions;
    const publishOptions = Array.isArray(rawOptions) ? rawOptions : [];
    // Support both legacy 'catalog' field and new 'publisher' field
    const couchdbSettings = publishOptions.find(
      (option) =>
        option.catalog === 'CouchDB' || option.publisher === 'CouchDB'
    );

    if (couchdbSettings) {
      // Only set defaults if fields are empty to avoid overwriting user input
      if (!this.remoteUrl) {
        this.remoteUrl =
          couchdbSettings.publisherEndpoint ||
          couchdbSettings['couchdb-url'] ||
          null;
      }
      if (!this.remoteName) {
        this.remoteName = couchdbSettings['couchdb-database'] || null;
      }
      if (!this.username) {
        this.username = couchdbSettings['couchdb-username'] || null;
      }
    }
  }

  @action
  async login() {
    await this.couch.login(
      this.remoteUrl,
      this.remoteName,
      this.username,
      this.password
    );
    if (this.couch.loggedIn) {
      this.username = null;
      this.password = null;
      this.remoteUrl = null;
      this.remoteName = null;
    } else {
      // Login failed - clear only the password, keep the rest so the
      // user doesn't have to re-enter (or wait for) their settings defaults
      this.password = null;
    }
  }

  @action
  logout() {
    this.couch.logout();
    // Fields are empty again after logout - refill them from settings
    this.loadDefaults();
  }

  @action
  push() {
    this.couch.push();
  }

  @action
  pull() {
    this.couch.pull();
  }

  @action
  sync() {
    this.couch.sync();
  }
}
