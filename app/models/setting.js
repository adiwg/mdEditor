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
  // `currentState` getter comment). Reading it can throw "memoSignal is
  // not a function" - but worse, *writing* a plain attr never notified
  // it as a classic-observer dependency in the first place (that part
  // never threw, it just silently never fired), so this observer never
  // actually ran on a real settings-page edit - every field on
  // /settings/main silently failed to persist. Watching the real attrs
  // directly instead - unlike the synthesized RecordState properties
  // (hasDirtyAttributes/isNew/isDeleted/isDirty, the ones broken
  // throughout this migration), plain attr()-backed properties fire
  // classic notifyPropertyChange normally; this app relies on that
  // everywhere else (e.g. `record.title` reads/writes). `lastVersion`/
  // `dateUpdated` deliberately excluded - not edited via any settings
  // UI, and services/settings.js's version-check path already does its
  // own explicit `.save()` when it sets them.
  updateSettings: observer(
    'compressOnSave',
    'showSplash',
    'keepSettings',
    'autoSave',
    'showDelete',
    'showCopy',
    'characterSet',
    'country',
    'language',
    'importUriBase',
    'mdTranslatorAPI',
    'itisProxyUrl',
    'fiscalStartMonth',
    'repositoryDefaults',
    'publishOptions',
    'customSchemas',
    function () {
      once(this, function () {
        this.save();
      });
    }
  ),
});

export { defaultValues, theModel as default };
