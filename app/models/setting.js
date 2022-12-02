import { alias } from '@ember/object/computed';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';
import DS from 'ember-data';
import EmberObject, { observer } from "@ember/object";

const defaultValues = {
  // mdTranslatorAPI: 'https://api.sciencebase.gov/mdTranslator/api/v3/translator',
  mdTranslatorAPI: 'https://dev-translator.mdeditor.org/api/v3/translator',
  fiscalStartMonth: '10'
};

const theModel = DS.Model.extend({
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
  compressOnSave: DS.attr('boolean', {
    defaultValue: true
  }),
  showSplash: DS.attr('boolean', {
    defaultValue: true
  }),
  autoSave: DS.attr('boolean', {
    defaultValue: false
  }),
  showDelete: DS.attr('boolean', {
    defaultValue: false
  }),
  showCopy: DS.attr('boolean', {
    defaultValue: false
  }),
  lastVersion: DS.attr('string', {
    defaultValue: ''
  }),
  dateUpdated: DS.attr('date', {
    defaultValue() {
      return new Date();
    }
  }),
  characterSet: DS.attr('string', {
    defaultValue: 'UTF-8'
  }),
  country: DS.attr('string', {
    defaultValue: 'USA'
  }),
  language: DS.attr('string', {
    defaultValue: 'eng'
  }),
  importUriBase: DS.attr('string', {
    defaultValue: ''
  }),
  mdTranslatorAPI: DS.attr('string', {
    defaultValue: defaultValues.mdTranslatorAPI
  }),
  fiscalStartMonth: DS.attr('string', {
    defaultValue: defaultValues.fiscalStartMonth
  }),
  repositoryDefaults: DS.attr('json'),
  publishOptions: DS.attr('json', {
    defaultValue: function () {
      return EmberObject.create();
    }
  }),
  customSchemas: DS.attr('json', {
    defaultValue: function () {
      return [];
    }
  }),
  locale: alias('defaultLocale'),

  wasLoaded() {
    this.settings
      .setup();
  },
  updateSettings: observer('hasDirtyAttributes',
    function () {
      if(this.hasDirtyAttributes) {
        run.once(this, function () {
          this.save();
        });
      }
    })
});

export {
  defaultValues,
  theModel as
  default
};
