import Ember from 'ember';
import DS from 'ember-data';
import EmberObject from "@ember/object";

const {
  //inject,
  run,
  computed,
  observer,
  inject: {
    service
  }
} = Ember;

const defaultValues = {
  mdTranslatorAPI: 'https://mdtranslator.herokuapp.com/api/v2/translator'
};

const theModel = DS.Model.extend({
  settings: service(),

  init() {
    this._super(...arguments);

    //this.on('didUpdate', this, this.wasUpdated);
    this.on('didLoad', this, this.wasLoaded);
    //this.on('didUpdate', this, this.wasLoaded);
    this.get('updateSettings');
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
  repositoryDefaults: DS.attr('json'),
  publishOptions: DS.attr('json', {
    defaultValue: function () {
      return EmberObject.create();
    }
  }),
  locale: computed.alias('defaultLocale'),

  wasLoaded() {
    this.get('settings')
      .setup();
  },
  updateSettings: observer('hasDirtyAttributes',
    function () {
      if(this.get('hasDirtyAttributes')) {
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
