import Component from '@ember/component';
import EmberObject, { getWithDefault, set } from '@ember/object';
import { once } from '@ember/runloop';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(function () {
      set(model, 'scope', getWithDefault(model, 'scope', {}));
      // set(model, 'plan', getWithDefault(model, 'plan', []));
      // set(model, 'requirement', getWithDefault(model, 'requirement', []));
      // set(model, 'objective', getWithDefault(model, 'objective', []));
      set(model, 'platform', getWithDefault(model, 'platform', []));
      // set(model, 'instrument', getWithDefault(model, 'instrument', []));
      // set(model, 'operation', getWithDefault(model, 'operation', []));
      // set(model, 'event', getWithDefault(model, 'event', []));
      // set(model, 'pass', getWithDefault(model, 'pass', []));
      // set(model, 'environment', getWithDefault(model, 'environment', {}));
    });
  },

  tagName: 'form',

  platformTemplateClass: EmberObject.extend({
    init() {
      this._super(...arguments);
      // this.set('timePeriod', {});
    },
  }),

  sourceTemplate: EmberObject.extend(),
});
