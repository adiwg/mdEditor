import Component from '@ember/component';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';
import { get, set, getWithDefault } from '@ember/object';
import { validator, buildValidations } from "ember-cp-validations";

const MESSAGE = 'Coverage name and coverage description are required';
const OPTS = {
  validate(value, options, model) {
    return model.notEmpty || MESSAGE
  }
}
const Validations = buildValidations({
  'covgeName': validator('inline', OPTS),
  'covgeDesc': validator('inline', OPTS)
})

export default Component.extend(Validations, {
  tagName: 'form',
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    if(model) {
      once(this, function () {
        set(model, 'processingLevelCode', getWithDefault(model, 'processingLevelCode', {}));
      })
    }
  },

  classNames: ['form'],
  covgeName: alias('model.coverageName'),
  covgeDesc: alias('model.coverageDescription'),
  covgeDescId: alias('model.processingLevelCode.identifier'),
  atrrGroup: alias('model.attributeGroup'),
  imgDesc: alias('model.imageDescription')
});
