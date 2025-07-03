import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import Setting from 'mdeditor/models/setting';
import { get, action } from '@ember/object';

@classic
export default class SettingsRoute extends Route {
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
      rec.save().then(() => window.location.reload());
    }

    window.location.reload();
    //this.transitionTo('application');
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
    const mdTranslatorAPI = model.get('mdTranslatorAPI');

    if (mdTranslatorAPI) {
      // Extract the base URL by removing the API path
      // This will convert https://api.sciencebase.gov/mdTranslator/api/v3/translator
      // to https://api.sciencebase.gov/mdTranslator
      const baseUrl = mdTranslatorAPI.replace(/\/api\/v\d+\/translator$/, '');

      model.set('itisProxyUrl', baseUrl);
    }
  }

  @action
  getPublishOptions(catalogName) {
    let model = this.modelFor('settings.main');
    let publishOptions = model.get('publishOptions') || [];
    
    // Find existing settings for this catalog
    let catalogSettings = publishOptions.find(options => options.catalog === catalogName);
    
    // If no settings exist for this catalog, create a default entry
    if (!catalogSettings) {
      catalogSettings = { catalog: catalogName };
      
      // Initialize default properties based on catalog type
      if (catalogName === 'CouchDB') {
        catalogSettings['couchdb-url'] = '';
        catalogSettings['couchdb-database'] = '';
        catalogSettings['couchdb-username'] = '';
      } else if (catalogName === 'ScienceBase') {
        catalogSettings['sb-defaultParent'] = '';
        catalogSettings['sb-publishEndpoint'] = '';
      }
      
      publishOptions.pushObject(catalogSettings);
      model.set('publishOptions', publishOptions);
    }
    
    return catalogSettings;
  }
}
