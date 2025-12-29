import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import {
  set,
  getWithDefault,
  get
} from '@ember/object';
import {
  once
} from '@ember/runloop';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'citation': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

@classic
@tagName('form')
export default class System extends Component.extend(Validations) {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'citation', getWithDefault(model,
        'citation', {}));
    });
  }

  @alias('model.citation')
  citation;
}
