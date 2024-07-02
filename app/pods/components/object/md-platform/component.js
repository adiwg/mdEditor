import Component from '@ember/component';
import { set, getWithDefault } from '@ember/object';
import { once } from '@ember/runloop';
import { validator, buildValidations } from 'ember-cp-validations';
import uuidV4 from 'uuid/v4';

const Validations = buildValidations({
  description: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
});

export default Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'platformId', getWithDefault(model, 'platformId', uuidV4()));
      set(model, 'citation', getWithDefault(model, 'citation', {}));
      set(model, 'identifier', getWithDefault(model, 'identifier', {}));
      set(model, 'description', getWithDefault(model, 'description', ''));
      // set(model, 'sponsor', getWithDefault(model, 'sponsor', []));
      set(model, 'instrument', getWithDefault(model, 'instrument', []));
      // set(model, 'history', getWithDefault(model, 'history', []));
    });
  },
});
