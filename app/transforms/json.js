import Transform from '@ember-data/serializer/transform';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';
import { A, isArray } from '@ember/array';


export default Transform.extend({
  clean: service('cleaner'),

  deserialize(serialized) {
    let json = JSON.parse(serialized);

    if(isArray(json)){
      return A(json);
    }

    return EmberObject.create(json);
  },

  serialize(deserialized) {
    let target = isArray(deserialized) ? [] :{};
    return JSON.stringify(this.clean.clean(deserialized, {target:target}));
  }

});
