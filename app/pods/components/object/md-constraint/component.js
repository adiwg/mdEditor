import Component from '@ember/component';
import { equal, alias } from '@ember/object/computed';
import { once } from '@ember/runloop';
import { set, getWithDefault, get } from '@ember/object';
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

    let model = get(this, 'model');

    once(this, function() {
      set(model, 'useLimitation', getWithDefault(model, 'useLimitation', []));
      set(model, 'graphic', getWithDefault(model, 'graphic', []));
      set(model, 'responsibleParty', getWithDefault(model,
        'responsibleParty', []));
      set(model, 'legal', getWithDefault(model, 'legal', {
        accessConstraint: [],
        useConstraint: [],
        otherConstraint: []
      }));
      set(model, 'security', getWithDefault(model, 'security', {}));
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

  typeOptions: [{
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
});
