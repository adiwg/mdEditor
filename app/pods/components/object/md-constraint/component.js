import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { equal, alias } from '@ember/object/computed';
import { once } from '@ember/runloop';
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
export default class MdConstraintComponent extends Component.extend(Validations) {
  /**
   * The string representing the path in the profile object for the resource.
   *
   * @property profilePath
   * @type {String}
   * @default 'false'
   * @required
   */

  /**
   * The object to use as the data model for the resource.
   *
   * @property model
   * @type {Object}
   * @required
   */

  tagName = 'form';

  @alias('model.type') type;
  @equal('type', 'use') useRequired;
  @equal('type', 'security') securityRequired;
  @equal('type', 'legal') legalRequired;
  @alias('model.security.classification') classification;

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

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    console.log('constraint model', model);

    once(this, function () {
      model.useLimitation = model.useLimitation ?? [];
      model.graphic = model.graphic ?? [];
      model.responsibleParty = model.responsibleParty ?? [];
      model.legal = model.legal ?? {
        accessConstraint: [],
        useConstraint: [],
        otherConstraint: [],
      };
      model.security = model.security ?? {};
      model.releasability = model.releasability ?? {
        addressee: [],
        statement: '',
        disseminationConstraint: [],
      };
    });
  }
}
