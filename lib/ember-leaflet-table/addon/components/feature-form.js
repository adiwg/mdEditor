import Ember from 'ember';
import layout from '../templates/components/feature-form';

const {set,Component,getWithDefault} = Ember;

export default Component.extend({
  init(){
    this._super(...arguments);

    let item = this.get('model');

    set(item, 'properties', getWithDefault(item, 'properties', {}));
    set(item, 'properties.name', getWithDefault(item, 'properties.name', 'Feature'));

  },
  
  layout,
  skipProperties: Ember.A(['name', 'description']),
  additionalProperties: Ember.computed('model', function() {
    Ember.assert('Must provide a valid model to feature-form', this.get('model'));

    let props = this.get('model.properties');

    if(props) {
      let keys = Object.keys(props);
      let addProp = Ember.A();

      keys.forEach((key) => {
        if(!this.get('skipProperties')
          .includes(key)) {
          addProp.pushObject({
            name: key,
            value: props[key]
          });
        }
      });

      return addProp;
    }
  })
});
