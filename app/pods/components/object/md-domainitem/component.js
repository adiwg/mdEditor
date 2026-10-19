import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import EmberObject, { set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { once } from '@ember/runloop';

import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
  value: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
  definition: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
});

const TemplateClass = EmberObject.extend(Validations, {
  init() {
    this._super(...arguments);

    set(this, 'reference', {});
  },
});

@classic
export default class MdDomainitemComponent extends Component.extend(Validations) {
  tagName = 'form';

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'reference', model.reference ?? {});
    });
  }
}

MdDomainitemComponent.reopen({
  name: alias('model.name'),
  value: alias('model.value'),
  definition: alias('model.definition'),
});

export { Validations, TemplateClass as Template };
