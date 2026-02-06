import { assert } from '@ember/debug';
import { A } from '@ember/array';
import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import layout from '../templates/components/feature-form';
import { once } from '@ember/runloop';

export default Component.extend({
  init() {
    this._super(...arguments);

    let item = this.get('model');

    set(item, 'properties', get(item, 'properties') || {});
    set(item, 'properties.name', get(item, 'properties.name') || 'Feature');
  },

  layout,
  skipProperties: A(['name', 'description']),
  additionalProperties: computed('model', function () {
    assert('Must provide a valid model to feature-form', this.get('model'));

    let props = this.get('model.properties');

    if (props) {
      let keys = Object.keys(props);
      let addProp = A();

      keys.forEach((key) => {
        if (!this.get('skipProperties').includes(key)) {
          addProp.pushObject({
            name: key,
            value: props[key],
          });
        }
      });

      return addProp;
    }
  }),
  willDestroyElement() {
    this._super(...arguments);

    once(this, () => this.set('model.form', null));
  },
});
