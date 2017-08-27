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
  'refType': [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      disabled: computed.notEmpty('model.model.referenceSystemIdentifier.identifier').volatile()
    })
  ],
  'refSystem': [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      disabled: computed.notEmpty('model.model.referenceSystemType').volatile()
    })
  ]
});

export default Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    once(this, function() {
      set(model, 'referenceSystemIdentifier', getWithDefault(model, 'referenceSystemIdentifier', {}));
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

  classNames: ['form'],
  refSystem: alias('model.referenceSystemIdentifier.identifier'),
  refType: alias('model.referenceSystemType')
});
