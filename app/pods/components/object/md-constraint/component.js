import Component from '@ember/component';
import { equal, alias } from '@ember/object/computed';
import { once } from '@ember/runloop';
import { computed, set, get } from '@ember/object';
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

export default Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    console.log('constraint model', model);

    once(this, function () {
      set(
        model,
        'useLimitation',
        get(model, 'useLimitation') !== undefined
          ? get(model, 'useLimitation')
          : [],
      );
      set(
        model,
        'graphic',
        get(model, 'graphic') !== undefined ? get(model, 'graphic') : [],
      );
      set(
        model,
        'responsibleParty',
        get(model, 'responsibleParty') !== undefined
          ? get(model, 'responsibleParty')
          : [],
      );
      set(
        model,
        'legal',
        get(model, 'legal') !== undefined
          ? get(model, 'legal')
          : {
              accessConstraint: [],
              useConstraint: [],
              otherConstraint: [],
            },
      );
      set(
        model,
        'security',
        get(model, 'security') !== undefined ? get(model, 'security') : {},
      );
      set(
        model,
        'releasability',
        get(model, 'releasability') !== undefined
          ? get(model, 'releasability')
          : {
              addressee: [],
              statement: '',
              dissemiantionConstraint: [],
            },
      );
    });
  },
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

  tagName: 'form',

  type: alias('model.type'),
  useRequired: equal('type', 'use'),
  securityRequired: equal('type', 'security'),
  legalRequired: equal('type', 'legal'),
  classification: alias('model.security.classification'),

  typeOptions: computed(function () {
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
  }),
});
