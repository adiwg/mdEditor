import Ember from 'ember';
import layout from '../templates/components/feature-form';

export default Ember.Component.extend({
  layout,
  skipProperties: Ember.A(['name', 'description']),
  additionalProperties: Ember.computed('model', function () {
    Ember.assert('Must provide a valid model to feature-form', this.get('model'));    

    let props = this.get('model.properties');
    let keys = Object.keys(props);
    let addProp = Ember.A();

    keys.forEach((key) => {
      if(!this.get('skipProperties')
        .contains(key)) {
        addProp.pushObject({
          name: key,
          value: props[key]
        });
      }
    });

    return addProp;
  })
});
