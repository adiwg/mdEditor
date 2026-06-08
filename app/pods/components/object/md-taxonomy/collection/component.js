import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import EmberObject, { set, get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { once } from '@ember/runloop';

import { validator, buildValidations } from 'ember-cp-validations';
import { Template as Voucher } from './voucher/component';

const Validations = buildValidations({
  title: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
  taxonomicSystem: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
  taxonomicClassification: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
});

const TemplateClass = EmberObject.extend(Validations, {
  init() {
    this._super(...arguments);

    set(this, 'taxonomicSystem', []);
    set(this, 'identificationReference', []);
    set(this, 'observer', []);
    set(this, 'voucher', []);
    set(this, 'taxonomicClassification', []);
  },
});

@classic
export default class MdTaxonomyCollectionComponent extends Component.extend(
  Validations
) {
  tagName = 'form';

  taxonomicSystem = alias('model.taxonomicSystem');
  title = alias('model.taxonomicSystem.firstObject.citation.title');
  identificationProcedure = alias('model.identificationProcedure');
  taxonomicClassification = alias('model.taxonomicClassification');

  voucherTemplate = Voucher;

  systemTemplate = EmberObject.extend({
    init() {
      this._super(...arguments);
      this.set('citation', {});
    },
  });

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      set(
        model,
        'taxonomicClassification',
        get(model, 'taxonomicClassification') ?? []
      );
      set(model, 'taxonomicSystem', get(model, 'taxonomicSystem') ?? []);
      set(
        model,
        'identificationReference',
        get(model, 'identificationReference') ?? []
      );
      set(model, 'observer', get(model, 'observer') ?? []);
      set(model, 'voucher', get(model, 'voucher') ?? []);
    });
  }
}

export { Validations, TemplateClass as Template };
