import Component from '@ember/component';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';
import { computed, set, getWithDefault } from '@ember/object';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    if (model) {
      once(this, function () {
        set(model, 'scope', getWithDefault(model, 'scope', {}));
        set(model, 'pass', getWithDefault(model, 'pass', false));
        set(model, 'specification', getWithDefault(model, 'specification', {}));
      });
    }
  },

  name: '',
  scopeCode: alias('model.scope.scopeCode'),
  resultText: computed('model.pass', function () {
    return this.get('model.pass')
      ? 'The result passes conformance.'
      : 'The result does not pass conformance.';
  }),
});
