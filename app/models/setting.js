import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  compressOnSave: DS.attr('boolean', {
    defaultValue: true
  }),
  updateSettings: Ember.observer('compressOnSave', function(){
    Ember.run.once(this, function(){
      this.save();
    });
  }),
});
