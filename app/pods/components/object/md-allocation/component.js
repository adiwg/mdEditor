import Ember from 'ember';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const {
  Component,
  computed: {
    alias
  },
  get,
  run: {
    once
  },
  getWithDefault,
  set
} = Ember;

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
    });
  },
  /**
   * The string representing the path in the profile object for the resource.
   *
   * @property profilePath
   * @type {String}
   * @default "false"
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
  amount: alias('model.amount'),
  currency: alias('model.currency')
});
