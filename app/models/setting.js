import Ember from 'ember';
import DS from 'ember-data';

const {
  //inject,
  run,
  computed,
  observer
} = Ember;

export default DS.Model.extend({
  init() {
    this._super(...arguments);

    this.get('hasDirtyAttributes');
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
  repositoryDefaults: DS.attr('json'),
  locale: computed.alias('defaultLocale'),
  updateSettings: observer('hasDirtyAttributes',
    function () {
      if(this.get('hasDirtyAttributes')) {
        run.once(this, function () {
          this.save();
        });
      }
    })
});
