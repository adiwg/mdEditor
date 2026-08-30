import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import EmberObject, { set, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { once } from '@ember/runloop';

import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  codeName: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
  dataType: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
  allowNull: [
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

    set(this, 'allowNull', true);
    set(this, 'attributeReference', {});
    set(this, 'alias', []);
    set(this, 'valueRange', []);
    set(this, 'timePeriod', []);
  },
});

@classic
export default class MdAttributeComponent extends Component.extend(Validations) {
  tagName = 'form';

  rangeTemplate = EmberObject.extend(
    buildValidations({
      minRangeValue: [
        validator('presence', {
          presence: true,
          ignoreBlank: true,
        }),
      ],
      maxRangeValue: [
        validator('presence', {
          presence: true,
          ignoreBlank: true,
        }),
      ],
    }),
    {
      init() {
        this._super(...arguments);
      },
    }
  );

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'allowNull', model.allowNull ?? false);
      set(model, 'reference', model.reference ?? {});
      set(model, 'alias', model.alias ?? []);
      set(model, 'valueRange', model.valueRange ?? []);
      set(model, 'timePeriod', model.timePeriod ?? []);
    });
  }
}

MdAttributeComponent.reopen({
  codeName: alias('model.codeName'),
  dataType: alias('model.dataType'),
  definition: alias('model.definition'),
  allowNull: alias('model.allowNull'),
  domains: alias('dictionary.domain'),

  domainList: computed('domains.{@each.domainId,@each.codeName}', function () {
    let domains = this.domains || [];

    return domains.map((domain) => {
      if (domain.domainId) {
        return {
          codeId: domain.domainId,
          codeName: domain.codeName,
          tooltip: domain.description,
        };
      }
    });
  }),
});

export { Validations, TemplateClass as Template };
