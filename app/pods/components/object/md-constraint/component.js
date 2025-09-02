import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { alias, equal } from '@ember/object/computed';
import Component from '@ember/component';
import { once } from '@ember/runloop';
import { set, getWithDefault, get, computed } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  classification: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
  type: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
});

@classic
@tagName('form')
export default class MdConstraint extends Component.extend(Validations) {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    console.log('constraint model', model);

    once(this, function () {
      set(model, 'useLimitation', getWithDefault(model, 'useLimitation', []));
      set(model, 'graphic', getWithDefault(model, 'graphic', []));
      set(
        model,
        'responsibleParty',
        getWithDefault(model, 'responsibleParty', [])
      );
      set(
        model,
        'legal',
        getWithDefault(model, 'legal', {
          accessConstraint: [],
          useConstraint: [],
          otherConstraint: [],
        })
      );
      set(model, 'security', getWithDefault(model, 'security', {}));
      set(
        model,
        'releasability',
        getWithDefault(model, 'releasability', {
          addressee: [],
          statement: '',
          disseminationConstraint: [],
        })
      );
    });
  }

  @alias('model.type')
  type;

  @equal('type', 'use')
  useRequired;

  @equal('type', 'security')
  securityRequired;

  @equal('type', 'legal')
  legalRequired;

  @alias('model.security.classification')
  classification;

  @computed
  get typeOptions() {
    return [
      {
        name: 'use',
        value: 'use',
      },
      {
        name: 'legal',
        value: 'legal',
      },
      {
        name: 'security',
        value: 'security',
      },
    ];
  }
}
