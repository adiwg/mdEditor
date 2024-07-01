import Model, { attr } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';
import EmberObject, { observer } from '@ember/object';

const defaultValues = {
  // mdTranslatorAPI: 'https://api.sciencebase.gov/mdTranslator/api/v3/translator',
  // itisProxyUrl: 'https://api.sciencebase.gov/mdTranslator',
  mdTranslatorAPI: 'http://23.23.4.125:3002/api/v3/translator',
  itisProxyUrl: 'http://23.23.4.125:3002',
  fiscalStartMonth: '10',
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

    //this.on('didUpdate', this, this.wasUpdated);
    this.on('didLoad', this, this.wasLoaded);
    //this.on('didUpdate', this, this.wasLoaded);
    this.updateSettings;
  },
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
  mdTranslatorAPI: attr('string', {
    defaultValue: defaultValues.mdTranslatorAPI,
  }),
  itisProxyUrl: attr('string', {
    defaultValue: defaultValues.itisProxyUrl,
  }),
  fiscalStartMonth: attr('string', {
    defaultValue: defaultValues.fiscalStartMonth,
  }),
  repositoryDefaults: attr('json'),
  publishOptions: attr('json', {
    defaultValue: function () {
      return EmberObject.create();
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
  updateSettings: observer('hasDirtyAttributes', function () {
    if (this.hasDirtyAttributes) {
      run.once(this, function () {
        this.save();
      });
    }
  }),
});

export { defaultValues, theModel as default };
