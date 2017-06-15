import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  init() {
    this._super(...arguments);

    this.get('hasDirtyAttributes');
  },
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
  locale: Ember.computed.alias('defaultLocale'),
  updateSettings: Ember.observer('hasDirtyAttributes',
    function () {
      if(this.get('hasDirtyAttributes')) {
        Ember.run.once(this, function () {
          this.save();
        });
      }
    })
});
