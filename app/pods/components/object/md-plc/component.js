import Component from '@ember/component';
import { getWithDefault, set, get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { once } from '@ember/runloop';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'identifier': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
})
export default Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    once(this, function () {
      set(model, 'authority', getWithDefault(model,
        'authority', {}))
    });
  },

  /**
   * The string representing the path in the profile object for the domain
   *
   * @property profilePath
   * @type {String}
   * @default 'false'
   * @required
   */

  /**
   * The object to use as the data model for the domain
   *
   * @property model
   * @type {Object}
   * @required
   */

  tagname: 'form',
  identifier: alias('model.identifier'),
});
