import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { getWithDefault, get, set } from '@ember/object';
import { once } from '@ember/runloop';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import { A } from '@ember/array';

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

    let model = this.model;

    once(this, function() {
      set(model, 'resourceType', getWithDefault(model, 'resourceType', []));
      set(model, 'citation', A(getWithDefault(model, 'citation', [{}])));
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

  citation: alias('model.citation'),
  resourceType: alias('model.resourceType')
});
