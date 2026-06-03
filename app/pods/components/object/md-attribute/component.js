import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import EmberObject, { set, get, computed } from '@ember/object';
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

  codeName = alias('model.codeName');
  dataType = alias('model.dataType');
  definition = alias('model.definition');
  allowNull = alias('model.allowNull');
  domains = alias('dictionary.domain');

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
      set(model, 'allowNull', get(model, 'allowNull') ?? false);
      set(model, 'reference', get(model, 'reference') ?? {});
      set(model, 'alias', get(model, 'alias') ?? []);
      set(model, 'valueRange', get(model, 'valueRange') ?? []);
      set(model, 'timePeriod', get(model, 'timePeriod') ?? []);
    });
  }

  @computed('domains.{@each.domainId,@each.codeName}')
  get domainList() {
    let domains = this.domains || [];

    return domains.map((domain) => {
      if (get(domain, 'domainId')) {
        return {
          codeId: get(domain, 'domainId'),
          codeName: get(domain, 'codeName'),
          tooltip: get(domain, 'description'),
        };
      }
    });
  }
}

export { Validations, TemplateClass as Template };
