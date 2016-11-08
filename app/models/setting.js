import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  compressOnSave: DS.attr('boolean', {
    defaultValue: true
  }),
  showSplash: DS.attr('boolean', {
    defaultValue: true
  }),
  lastVersion: DS.attr('string', {
    defaultValue: ''
  }),
  dateUpdated: DS.attr('date', {
    defaultValue() {
      return new Date();
    }
  }),
  updateSettings: Ember.observer('compressOnSave','showSplash', function(){
    Ember.run.once(this, function(){
      this.save();
    });
  }),
});
