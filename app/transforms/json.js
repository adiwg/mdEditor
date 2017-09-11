import Ember from 'ember';
import DS from 'ember-data';

const {
  inject,isArray,A
} = Ember;


export default DS.Transform.extend({
  clean: inject.service('cleaner'),

  deserialize(serialized) {
    let json = JSON.parse(serialized);

    if(isArray(json)){
      return A(json);
    }

    return Ember.Object.create(json);
  },

  serialize(deserialized) {
    let target = isArray(deserialized) ? [] :{};
    return JSON.stringify(this.get('clean').clean(deserialized, {target:target}));
  }

});
