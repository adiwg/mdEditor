import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Transform from '@ember-data/serializer/transform';
import EmberObject from '@ember/object';
import { A, isArray } from '@ember/array';


@classic
export default class Json extends Transform {
  @service('cleaner')
  clean;

  deserialize(serialized) {
    let json = JSON.parse(serialized);

    if(isArray(json)){
      return A(json);
    }

    return EmberObject.create(json);
  }

  serialize(deserialized) {
    let target = isArray(deserialized) ? [] :{};
    return JSON.stringify(this.clean.clean(deserialized, {target:target}));
  }
}
