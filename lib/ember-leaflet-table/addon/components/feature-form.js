import { get } from '@ember/object';
import { assert } from '@ember/debug';
import { A } from '@ember/array';
import Component from '@ember/component';
import { getWithDefault, set, computed } from '@ember/object';
import layout from '../templates/components/feature-form';
import { once } from '@ember/runloop';

export default Component.extend({
  init() {
    this._super(...arguments);

    let item = this.model;

    set(item, 'properties', (item.properties === undefined ? {} : item.properties));
    set(item, 'properties.name', (get(item, 'properties.name') === undefined ? 'Feature' : get(item, 'properties.name')));

  },

  layout,
  skipProperties: A(['name', 'description']),
  additionalProperties: computed('model.properties', 'skipProperties', function () {
    assert('Must provide a valid model to feature-form', this.model);

    let props = this.get('model.properties');

    if(props) {
      let keys = Object.keys(props);
      let addProp = A();

      keys.forEach((key) => {
        if(!this.skipProperties
          .includes(key)) {
          addProp.pushObject({
            name: key,
            value: props[key]
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
