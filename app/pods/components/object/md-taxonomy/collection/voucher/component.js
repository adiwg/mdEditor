import EmberObject, { get, set } from '@ember/object';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
import { once } from '@ember/runloop';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  specimen: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
  repository: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
});

const Template = EmberObject.extend(Validations, {
  init() {
    this._super(...arguments);
    this.set('repository', {});
    this.set('specimen', null);
  },
});

@classic
export default class MdVoucherComponent extends Component.extend(Validations) {
  classNames = ['form'];

  templateClass = Template;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'repository', get(model, 'repository') ?? {});
      set(model, 'specimen', get(model, 'specimen') ?? null);
    });
  }
}

MdVoucherComponent.reopen({
  specimen: alias('model.specimen'),
  repository: alias('model.repository'),
});

export { Validations, Template };
