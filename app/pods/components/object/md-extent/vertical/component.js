import Component from '@ember/component';
import { once } from '@ember/runloop';
import { set, get, getWithDefault } from '@ember/object';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    let model = get(this, 'model');
    once(this, function () {
      set(model, 'description', getWithDefault(model, 'description', null));
      set(model, 'minValue', getWithDefault(model, 'minValue', null));
      set(model, 'maxValue', getWithDefault(model, 'maxValue', null));
      set(model, 'crsId', getWithDefault(model, 'crsId', {}));
    });
  },
});
