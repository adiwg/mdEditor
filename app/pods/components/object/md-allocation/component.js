import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { once } from '@ember/runloop';
import { set, getWithDefault, get } from '@ember/object';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'amount': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'currency': [
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
      set(model, 'currency', getWithDefault(model, 'currency', 'USD'));
      set(model, 'onlineResource', getWithDefault(model, 'onlineResource', []));
      set(model, 'responsibleParty', getWithDefault(model, 'responsibleParty', []));
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

  attributeBindings: ['data-spy'],
  'data-spy': 'Allocation',
  tagName: 'form',
  amount: alias('model.amount'),
  currency: alias('model.currency')
});
