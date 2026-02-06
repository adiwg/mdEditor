import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { scheduleOnce } from '@ember/runloop';

export default class CouchLoginComponent extends Component {
  @service couch;
  @service settings;

  // User data
  @tracked username = null;
  @tracked password = null;
  // DB data
  @tracked remoteUrl = null;
  @tracked remoteName = null;
  // Internal tracking
  _defaultsScheduled = false;

  constructor() {
    super(...arguments);
    // Set up initial defaults
    this.loadDefaults();
  }

  loadDefaults() {
    if (this.settings.data && !this.couch.loggedIn) {
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
  }

  get settingsAvailable() {
    // Non-reactive getter to check if settings are loaded
    const hasSettings = !!this.settings.data;

    // Schedule defaults loading for next run loop to avoid revalidation
    if (hasSettings && !this.couch.loggedIn && !this._defaultsScheduled) {
      this._defaultsScheduled = true;
      scheduleOnce('afterRender', this, 'loadDefaults');
    }

    return hasSettings;
  }

  @action
  login() {
    this.couch.login(
      this.remoteUrl,
      this.remoteName,
      this.username,
      this.password
    );
    this.username = null;
    this.password = null;
    this.remoteUrl = null;
    this.remoteName = null;
  }

  @action
  logout() {
    this.couch.logout();
    // Reset scheduling flag so defaults can be loaded again
    this._defaultsScheduled = false;
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
