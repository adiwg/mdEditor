import Model, { attr } from '@ember-data/model';
import { observer } from '@ember/object';
import { alias } from '@ember/object/computed';
import { once } from '@ember/runloop';
import { inject as service } from '@ember/service';

const defaultValues = {
  // itisProxyUrl: 'https://api.sciencebase.gov/mdTranslator',
  // mdTranslatorAPI: 'https://dev-mdtranslator.mdeditor.org/api/v3/translator',
  // itisProxyUrl: 'https://dev-mdtranslator.mdeditor.org',
  fiscalStartMonth: '10',
  publishOptions: [
    {
      publisher: 'ScienceBase',
      publisherEndpoint: '',
      'sb-defaultParent': '',
    },
    {
      publisher: 'CouchDB',
      publisherEndpoint: '',
      'couchdb-database': '',
      'couchdb-username': '',
    },
  ],
};

const theModel = Model.extend({
  /**
   * Setting model
   *
   * @class setting
   * @constructor
   * @extends DS.Model
   * @module mdeditor
   * @submodule data-models
   */

  settings: service(),

  init() {
    this._super(...arguments);

    this.updateSettings;
  },

  // Replace deprecated this.on('didLoad', ...) with an observer on isLoaded
  observeLoaded: observer('isLoaded', function () {
    if (this.isLoaded && !this._wasLoadedCalled) {
      this._wasLoadedCalled = true;
      this.wasLoaded();
    }
  }),
  //cleaner: inject.service(),
  compressOnSave: attr('boolean', {
    defaultValue: true,
  }),
  showSplash: attr('boolean', {
    defaultValue: true,
  }),
  keepSettings: attr('boolean', {
    defaultValue: true,
  }),
  autoSave: attr('boolean', {
    defaultValue: false,
  }),
  showDelete: attr('boolean', {
    defaultValue: false,
  }),
  showCopy: attr('boolean', {
    defaultValue: false,
  }),
  lastVersion: attr('string', {
    defaultValue: '',
  }),
  dateUpdated: attr('date', {
    defaultValue() {
      return new Date();
    },
  }),
  characterSet: attr('string', {
    defaultValue: 'UTF-8',
  }),
  country: attr('string', {
    defaultValue: 'USA',
  }),
  language: attr('string', {
    defaultValue: 'eng',
  }),
  importUriBase: attr('string', {
    defaultValue: '',
  }),
  mdTranslatorAPI: attr('string'),
  itisProxyUrl: attr('string'),
  fiscalStartMonth: attr('string', {
    defaultValue: defaultValues.fiscalStartMonth,
  }),
  repositoryDefaults: attr('json'),
  publishOptions: attr('json', {
    defaultValue: function () {
      return defaultValues.publishOptions.slice(); // Return a copy of the default array
    },
  }),
  customSchemas: attr('json', {
    defaultValue: function () {
      return [];
    },
  }),
  locale: alias('defaultLocale'),

  wasLoaded() {
    this.settings.setup();
  },
  // ember-data 5.x's native hasDirtyAttributes is backed by
  // @warp-drive/legacy's decorateMethodV2/@memoized machinery, which its
  // own source acknowledges breaks under classic Ember .extend()/mixin
  // merging ("lazy in prod and eager in dev" - see
  // node_modules/@warp-drive/legacy/dist/schema-provider-*.js's
  // `currentState` getter comment) - reading it here can throw
  // "memoSignal is not a function". once() defers off the triggering
  // notification, and the try/catch fails closed (skip the save) if the
  // read is still unreadable, rather than crashing or save-looping.
  updateSettings: observer('hasDirtyAttributes', function () {
    once(this, function () {
      let dirty = false;

      try {
        dirty = this.hasDirtyAttributes;
      } catch (e) {
        // ignore - see comment above
      }

      if (dirty) {
        this.save();
      }
    });
  }),
});

export { defaultValues, theModel as default };
