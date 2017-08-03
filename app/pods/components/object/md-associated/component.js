import Ember from 'ember';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const {
  Component,
  computed,
  set,
  get,
  getWithDefault,
  run: {
    once
  }
} = Ember;

const Validations = buildValidations({
  'associationType': [
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
      set(model, 'scope', getWithDefault(model, 'scope', {}));
      set(model, 'resourceType', getWithDefault(model, 'resourceType', []));
      set(model, 'resourceCitation', getWithDefault(model, 'resourceCitation', {}));
      set(model, 'metadataCitation', getWithDefault(model, 'metadataCitation', {}));
    });
  },

  tagName: 'form',

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

  associationType: computed.alias('model.associationType')
});
