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
      set(
        model,
        'instrumentId',
        getWithDefault(model, 'instrumentId', uuidV4())
      );
      set(model, 'citation', getWithDefault(model, 'citation', {}));
      set(model, 'identifier', getWithDefault(model, 'identifier', {}));
      set(model, 'instrumentType', getWithDefault(model, 'instrumentType', ''));
      set(model, 'description', getWithDefault(model, 'description', ''));
      // set(model, 'mountedOn', getWithDefault(model, 'mountedOn', {}));
      // set(model, 'history', getWithDefault(model, 'history', []));
      // set(model, 'hostId', getWithDefault(model, 'hostId', {}));
    });
  },
});
