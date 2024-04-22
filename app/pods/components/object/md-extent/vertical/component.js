import Component from '@ember/component';
import { once } from '@ember/runloop';
import { set, get } from '@ember/object';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    let model = get(this, 'model');
    once(this, function () {
      set(model, 'description', get(model, 'description') !== undefined ? get(model, 'description') : null);
      set(model, 'minValue', get(model, 'minValue') !== undefined ? get(model, 'minValue') : null);
      set(model, 'maxValue', get(model, 'maxValue') !== undefined ? get(model, 'maxValue') : null);
      set(model, 'crsId', get(model, 'crsId') !== undefined ? get(model, 'crsId') : {});
    });
  },
});
