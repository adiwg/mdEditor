import Component from '@ember/component';
import { alias, notEmpty } from '@ember/object/computed';
import { once } from '@ember/runloop';
import { set, getWithDefault, get } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  refType: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      disabled: notEmpty('model.model.referenceSystemIdentifier.identifier'),
    }),
  ],
  refSystem: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      disabled: notEmpty('model.model.referenceSystemType'),
    }),
  ],
});

export default Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    if (model) {
      once(this, function () {
        set(
          model,
          'referenceSystemIdentifier',
          getWithDefault(model, 'referenceSystemIdentifier', {})
        );
      });
    }
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
  refType: alias('model.referenceSystemType'),
});
