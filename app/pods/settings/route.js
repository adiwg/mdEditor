import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import Setting from 'mdeditor/models/setting';
import { get, set, action } from '@ember/object';

@classic
export default class SettingsRoute extends Route {
  @service
  store;

  @service
  settings;

  @service
  publish;

  /**
   * The profile service
   *
   * @return {Ember.Service} profile
   */
  @service
  profile;

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
      }
    ];
    controller.set('links', links);
  }

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
      rec.save().then(() => window.location.reload());
    }

    window.location.reload();
    //this.transitionTo('application');
  }

  save() {
    this.settings.data.save();
  }

  catalogs() {
    return this.get('publish.catalogs');
  }

  deriveItisProxyUrl() {
    let model = this.modelFor('settings.main');
    const mdTranslatorAPI = model.get('mdTranslatorAPI');
    console.log(mdTranslatorAPI);
    if (mdTranslatorAPI) {
      // Extract the base URL by removing the API path
      // This will convert https://api.sciencebase.gov/mdTranslator/api/v3/translator
      // to https://api.sciencebase.gov/mdTranslator
      const baseUrl = mdTranslatorAPI.replace(/\/api\/v\d+\/translator$/, '');

      model.set('itisProxyUrl', baseUrl);
    }
  }

  getPublishOptions(catalogName) {
    let model = this.modelFor('settings.main');
    let publishOptions = model.get('publishOptions') || [];

    // Ensure publishOptions is always an array
    if (!Array.isArray(publishOptions)) {
      publishOptions = [];
      model.set('publishOptions', publishOptions);
    }

    // Find existing settings for this catalog
    // Support both legacy 'catalog' field and new 'publisher' field
    let catalogSettings = publishOptions.find(
      (options) =>
        options.catalog === catalogName || options.publisher === catalogName
    );

    // If no settings exist for this catalog, create a default entry
    if (!catalogSettings) {
      catalogSettings = {
        publisher: catalogName, // Use new 'publisher' field
        publisherEndpoint: '', // Add new 'publisherEndpoint' field
      };

      // Initialize default properties based on catalog type
      if (catalogName === 'CouchDB') {
        catalogSettings.publisherEndpoint = '';
        catalogSettings['couchdb-database'] = '';
        catalogSettings['couchdb-username'] = '';
      } else if (catalogName === 'ScienceBase') {
        catalogSettings['sb-defaultParent'] = '';
        catalogSettings.publisherEndpoint =
          'https://api.sciencebase.gov/sbmd-service/';
      }

      publishOptions.pushObject(catalogSettings);
      model.set('publishOptions', publishOptions);
    } else if (catalogSettings.catalog && !catalogSettings.publisher) {
      // Migrate legacy 'catalog' field to new 'publisher' field
      set(catalogSettings, 'publisher', catalogSettings.catalog);
      delete catalogSettings.catalog;

      // Migrate legacy endpoint fields to publisherEndpoint
      if (!catalogSettings.publisherEndpoint) {
        if (catalogSettings['sb-publishEndpoint']) {
          // Migrate ScienceBase endpoint
          set(
            catalogSettings,
            'publisherEndpoint',
            catalogSettings['sb-publishEndpoint']
          );
          delete catalogSettings['sb-publishEndpoint'];
        } else if (catalogSettings['couchdb-url']) {
          // Migrate CouchDB endpoint
          set(
            catalogSettings,
            'publisherEndpoint',
            catalogSettings['couchdb-url']
          );
          delete catalogSettings['couchdb-url'];
        } else {
          // Set default based on publisher type
          set(
            catalogSettings,
            'publisherEndpoint',
            catalogName === 'ScienceBase'
              ? 'https://api.sciencebase.gov/sbmd-service/'
              : ''
          );
        }
      }

      model.set('publishOptions', publishOptions);
    } else {
      // Handle cases where publisher exists but we need to migrate endpoint fields
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
        model.set('publishOptions', publishOptions);
      }
    }

    return catalogSettings;
  }
}
