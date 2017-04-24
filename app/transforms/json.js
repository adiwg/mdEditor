import Ember from 'ember';
import DS from 'ember-data';

const {
  inject
} = Ember;

export default DS.Transform.extend({
  clean: inject.service('cleaner'),

  deserialize(serialized) {
    return Ember.Object.create(JSON.parse(serialized));
  },

  serialize(deserialized) {
    return JSON.stringify(this.get('clean').clean(deserialized));
  }

});
