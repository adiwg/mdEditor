import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { notEmpty, alias } from '@ember/object/computed';
import Component from '@ember/component';
import { once } from '@ember/runloop';
import { set, getWithDefault, get } from '@ember/object';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'refType': [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      disabled: notEmpty('model.model.referenceSystemIdentifier.identifier')
    })
  ],
  'refSystem': [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      disabled: notEmpty('model.model.referenceSystemType')
    })
  ]
});

@classic
@classNames('form')
export default class MdSrs extends Component.extend(Validations) {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    if(model){
    once(this, function() {
      set(model, 'referenceSystemIdentifier', getWithDefault(model, 'referenceSystemIdentifier', {}));
    });
  }
  }

  @alias('model.referenceSystemIdentifier.identifier')
  refSystem;

  @alias('model.referenceSystemType')
  refType;
}
