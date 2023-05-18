import Component from '@ember/component';
import {
  equal,
  alias
} from '@ember/object/computed';
import {
  once
} from '@ember/runloop';
import {
  computed,
  set,
  getWithDefault,
  get
} from '@ember/object';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'classification': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'type': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

export default Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'useLimitation', (model.useLimitation === undefined ? [] : model.useLimitation));
      set(model, 'graphic', (model.graphic === undefined ? [] : model.graphic));
      set(model, 'responsibleParty', (model.responsibleParty === undefined ? [] : model.responsibleParty));
      set(model, 'legal', (model.legal === undefined ? {
        accessConstraint: [],
        useConstraint: [],
        otherConstraint: []
      } : model.legal));
      set(model, 'security', (model.security === undefined ? {} : model.security));
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
  // measureUnit: alias('model.measure.unitOfMeasure'),
  // measurePresent: or('measureType','measureUnit','measureValue'),

  typeOptions: computed(function () {
    return [{
        name: 'use',
        value: 'use'
      },
      {
        name: 'legal',
        value: 'legal'
      },
      {
        name: 'security',
        value: 'security'
      }
    ]
  })
});
