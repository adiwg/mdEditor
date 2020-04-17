import Component from '@ember/component';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';
import { get, set, getWithDefault } from '@ember/object';
import { validator, buildValidations } from "ember-cp-validations";


const Validations = buildValidations({
  'name': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'description': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

export default Component.extend(Validations, {
  tagName: 'form',
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    if(model) {
      once(this, function () {
        set(model, 'processingLevelCode', getWithDefault(model, 'processingLevelCode', {}));
        set(model, 'imageDescription', getWithDefault(model,
        'imageDescription', {}))
      })
    }
  },

  classNames: ['form'],
  name: alias('model.coverageName'),
  description: alias('model.coverageDescription'),
});
export {
  Validations
};
