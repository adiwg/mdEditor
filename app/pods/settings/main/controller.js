import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SettingsMainController extends Controller {
  @service settings;
  @service publish;

  @tracked showStorageModal = false;

  get catalogs() {
    return this.publish.catalogs || [];
  }

  @action
  clearLocalStorage() {
    return this.send('clearLocalStorage');
  }

  @action
  save() {
    this.send('save');
  }

  @action
  setScrollTo(scrollTo) {
    this.send('setScrollTo', scrollTo);
  }

  @action
  getPublishOptions(catalogName) {
    const model = this.model;
    if (!model || typeof model.get !== 'function') {
      return {};
    }

    let publishOptions = model.get('publishOptions') || [];

    if (!Array.isArray(publishOptions)) {
      publishOptions = [];
      model.set('publishOptions', publishOptions);
    }

    let catalogSettings = publishOptions.find(
      (options) =>
        options.catalog === catalogName || options.publisher === catalogName
    );

    if (!catalogSettings) {
      catalogSettings = {
        publisher: catalogName,
        publisherEndpoint: '',
      };

      if (catalogName === 'CouchDB') {
        catalogSettings.publisherEndpoint = '';
        catalogSettings['couchdb-database'] = '';
        catalogSettings['couchdb-username'] = '';
      } else if (catalogName === 'ScienceBase') {
        catalogSettings['sb-defaultParent'] = '';
        catalogSettings.publisherEndpoint =
          'https://api.sciencebase.gov/sbmd-service/';
      }

      publishOptions.push(catalogSettings);
      model.set('publishOptions', publishOptions);
      return catalogSettings;
    }

    if (catalogSettings.catalog && !catalogSettings.publisher) {
      set(catalogSettings, 'publisher', catalogSettings.catalog);
      delete catalogSettings.catalog;
    }

    if (!catalogSettings.publisherEndpoint) {
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
          catalogName === 'ScienceBase'
            ? 'https://api.sciencebase.gov/sbmd-service/'
            : ''
        );
      }
      model.set('publishOptions', publishOptions);
    }

    return catalogSettings;
  }

  @action
  deriveItisProxyUrl() {
    const mdTranslatorAPI = this.model.get('mdTranslatorAPI');
    if (mdTranslatorAPI) {
      const baseUrl = mdTranslatorAPI.replace(
        /\/api\/v\d+(\/translator)?$/,
        ''
      );
      this.model.set('itisProxyUrl', baseUrl);
    }
  }
}
