import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import EmberObject, { set, getWithDefault, get } from '@ember/object';
import {
  once
} from '@ember/runloop';

import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'name': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'value': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'definition': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});


@classic
class TemplateClass extends EmberObject.extend(Validations) {
  init() {
    super.init(...arguments);

    set(this, 'reference', {});
  }
}

@classic
@tagName('form')
class theComp extends Component.extend(Validations) {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'reference', getWithDefault(model,
        'reference', {}));
    });
  }

  @alias('model.name')
  name;

  @alias('model.value')
  value;

  @alias('model.definition')
  definition;
}

export {
  Validations,
  TemplateClass as Template,
  theComp as
  default
};
