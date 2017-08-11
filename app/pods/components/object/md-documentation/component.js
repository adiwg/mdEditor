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
  'resourceType': [
    validator('array-required', {
      track: ['type']
    })
  ]
});

export default Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    once(this, function() {
      set(model, 'resourceType', getWithDefault(model, 'resourceType', []));
      set(model, 'citation', getWithDefault(model, 'citation', []));
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

  citation: computed.alias('model.citation'),
  resourceType: computed.alias('model.resourceType')
});
