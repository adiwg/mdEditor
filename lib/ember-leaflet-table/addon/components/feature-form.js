import { assert } from '@ember/debug';
import { A } from '@ember/array';
import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/feature-form';
import { once } from '@ember/runloop';

export default Component.extend({
  init() {
    this._super(...arguments);

    let item = this.model;

    // Plain assignment, not set() - this runs in init(), before this
    // component's own initial render has read anything on `item`, but the
    // template reads `model.properties.name` in that same render pass (see
    // feature-form.hbs). set()'s explicit dirty-tracking then trips Ember's
    // backtracking-rerender assertion ("attempted to update X after using it
    // in the same computation") whenever a feature reaches this form without
    // a name yet (e.g. an imported feature - a freshly-drawn one already has
    // one, see leaflet-draw.js). A plain JS write doesn't go through that
    // tracking path, so it's safe regardless of read order.
    item.properties = item.properties || {};
    item.properties.name = item.properties.name || 'Feature';
  },

  layout,
  skipProperties: A(['name', 'description']),
  additionalProperties: computed('model', function () {
    assert('Must provide a valid model to feature-form', this.model);

    let props = this.model.properties;

    if (props) {
      let keys = Object.keys(props);
      let addProp = A();

      keys.forEach((key) => {
        if (!this.skipProperties.includes(key)) {
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
