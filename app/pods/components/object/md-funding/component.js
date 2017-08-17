import Ember from 'ember';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const {
  Component,
  computed,
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
  'allocation': [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      disabled: computed.notEmpty('model.timePeriod')
    })
  ],
  'timePeriod': [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      disabled: computed.notEmpty('model.allocation')
    })
  ]
});

export default Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    once(this, function() {
      set(model, 'allocation', getWithDefault(model, 'allocation', []));
      set(model, 'timePeriod', getWithDefault(model, 'timePeriod', {}));
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
  allocation: alias('model.allocation'),
  timePeriod: alias('model.timePeriod')
});
