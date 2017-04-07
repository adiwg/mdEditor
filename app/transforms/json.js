import Ember from  'ember';
import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function (serialized) {
    return Ember.Object.create(JSON.parse(serialized));
  },

  serialize: function (deserialized) {
    return JSON.stringify(deserialized);
  }
});
