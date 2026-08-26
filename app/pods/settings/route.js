import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { set, action } from '@ember/object';
import { schedule } from '@ember/runloop';

@classic
export default class SettingsRoute extends Route {
  @service
  store;

  @service
  settings;

  @service
  publish;

  @service
  flashMessages;

  /**
   * The profile service
   *
   * @return {Ember.Service} profile
   */
  @service
  profile;

  beforeModel() {
    return this.settings._setupPromise;
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    const links = [
      {
        title: 'Main',
        target: 'settings.main',
        tip: 'Main application settings',
      },
      {
        title: 'Profiles',
        target: 'settings.profile',
        tip: 'Custom profile settings',
      },
      {
        title: 'Validation',
        target: 'settings.validation',
        tip: 'Custom validation settings',
      },
    ];
    controller.set('links', links);
  }

  @action
  clearLocalStorage() {
    let data = this.settings.data.serialize({ includeId: true });

    window.localStorage.clear();

    if (this.settings.data.keepSettings) {
      window.localStorage.setItem(
        'index-settings',
        `["settings-${data.data.id}"]`
      );
      this.store.pushPayload('setting', data);

      let rec = this.store.peekRecord('setting', data.data.id);
      rec
        .save()
        .catch((error) => {
          // Reload regardless of whether the save succeeded -- storage
          // was already cleared above, so staying on the stale page isn't
          // an option. Surface the failure instead of leaving the user to
          // notice settings didn't come back after a manual reload.
          this.flashMessages.danger(
            'Failed to save settings before reload: ' + error.message
          );
        })
        .finally(() => window.location.reload());
      return;
    }

    window.location.reload();
  }

  @action
  save() {
    this.settings.data.save();
  }

  @action
  catalogs() {
    return this.get('publish.catalogs');
  }

  @action
  deriveItisProxyUrl() {
    let model = this.modelFor('settings.main');
    if (!model || typeof model.get !== 'function') {
      return;
    }
    const mdTranslatorAPI = model.get('mdTranslatorAPI');
    if (mdTranslatorAPI) {
      // Extract the base URL by removing the API path
      // This will convert https://api.sciencebase.gov/mdTranslator/api/v3/translator
      // to https://api.sciencebase.gov/mdTranslator
      const baseUrl = mdTranslatorAPI.replace(/\/api\/v\d+(\/translator)?$/, '');

      model.set('itisProxyUrl', baseUrl);
    }
  }

  @action
  getPublishOptions(catalogName) {
    let model = this.modelFor('settings.main');
    if (!model || typeof model.get !== 'function') {
      return {};
    }
    let publishOptions = model.get('publishOptions');
    if (!Array.isArray(publishOptions)) {
      publishOptions = [];
    }

    // Find existing settings for this catalog
    // Support both legacy 'catalog' field and new 'publisher' field
    let catalogSettings = publishOptions.find(
      (options) =>
        options.catalog === catalogName || options.publisher === catalogName
    );

    if (catalogSettings) {
      // Field migrations mutate model state, which must not happen
      // synchronously while this is being read during a render (it was
      // the cause of an intermittent "must supply both model and
      // valuePath" crash in couchdb-settings/sb-settings) -- defer to
      // after the current render completes.
      schedule(
        'afterRender',
        this,
        this._migratePublishOptions,
        model,
        catalogSettings
      );

      return catalogSettings;
    }

    // No settings exist for this catalog yet. Return a default entry for
    // this render, and persist it after the render completes instead of
    // mutating the model mid-render.
    let defaults = this._buildDefaultPublishOptions(catalogName);

    schedule(
      'afterRender',
      this,
      this._addDefaultPublishOptions,
      model,
      catalogName,
      defaults
    );

    return defaults;
  }

  _buildDefaultPublishOptions(catalogName) {
    let defaults = {
      publisher: catalogName,
      publisherEndpoint: '',
    };

    if (catalogName === 'CouchDB') {
      defaults['couchdb-database'] = '';
      defaults['couchdb-username'] = '';
    } else if (catalogName === 'ScienceBase') {
      defaults['sb-defaultParent'] = '';
      defaults.publisherEndpoint = 'https://api.sciencebase.gov/sbmd-service/';
    }

    return defaults;
  }

  _addDefaultPublishOptions(model, catalogName, defaults) {
    if (model.isDestroyed || model.isDestroying) {
      return;
    }

    let publishOptions = model.get('publishOptions');
    if (!Array.isArray(publishOptions)) {
      publishOptions = [];
    }

    let exists = publishOptions.find(
      (options) =>
        options.catalog === catalogName || options.publisher === catalogName
    );

    if (exists) {
      return;
    }

    publishOptions.pushObject(defaults);
    model.set('publishOptions', publishOptions);
  }

  _migratePublishOptions(model, catalogSettings) {
    if (model.isDestroyed || model.isDestroying) {
      return;
    }

    let mutated = false;

    // Migrate legacy 'catalog' field to new 'publisher' field
    if (catalogSettings.catalog && !catalogSettings.publisher) {
      set(catalogSettings, 'publisher', catalogSettings.catalog);
      delete catalogSettings.catalog;
      mutated = true;
    }

    // Migrate legacy endpoint fields to publisherEndpoint
    if (catalogSettings.publisher && !catalogSettings.publisherEndpoint) {
      if (catalogSettings['sb-publishEndpoint']) {
        set(
          catalogSettings,
          'publisherEndpoint',
          catalogSettings['sb-publishEndpoint']
        );
        delete catalogSettings['sb-publishEndpoint'];
      } else if (catalogSettings['couchdb-url']) {
        set(
          catalogSettings,
          'publisherEndpoint',
          catalogSettings['couchdb-url']
        );
        delete catalogSettings['couchdb-url'];
      } else {
        set(
          catalogSettings,
          'publisherEndpoint',
          catalogSettings.publisher === 'ScienceBase'
            ? 'https://api.sciencebase.gov/sbmd-service/'
            : ''
        );
      }
      mutated = true;
    }

    if (mutated) {
      model.set('publishOptions', model.get('publishOptions'));
    }
  }
}
