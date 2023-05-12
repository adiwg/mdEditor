import { assert } from '@ember/debug';
import { get } from '@ember/object';
import { isArray } from '@ember/array';
import BaseValidator from 'ember-cp-validations/validators/base';

const ArrayRequired = BaseValidator.extend({
  /**
  * Validation that checks array length
  *
  * @module mdeditor
  * @submodule validator
  * @class array-required
  * @extends BaseValidator
  * @example
  *   validator('array-required', {
        track: ['type']
      })
  */

  /**
   * Validate the array
   *
   * @method validate
   * @param {Array} value The array to test
   * @param {Object} options
   * @return {Mixed} True or error message
   *
   */
  validate(value, options) {
    if(isArray(value)) {
      if(value.length) {
        return true;
      }
    }

    options.item = this.options.description || this.options.attribute;

    return this.createErrorMessage('arrayRequired', value, options);
  }
});

ArrayRequired.reopenClass({
  /**
   * Define attribute specific dependent keys for your validator
   *
   * [
   * 	`model.array.@each.${attribute}` --> Dependent is created on the model's context
   * 	`${attribute}.isValid` --> Dependent is created on the `model.validations.attrs` context
   * ]
   *
   * @property getDependentsFor
   * @param {String}  attribute   The attribute being evaluated
   * @param {Unknown} options     Options passed into your validator
   * @return {Array}
   */
  getDependentsFor(attribute, options) {
    //return[];
    let track = [];
    let opts = options.track;

    assert(
      `[validator:array-valid] [${attribute}] option 'track' must be an array`,
      isArray(opts));

    if(!isArray(opts)) return track;

    opts.forEach((itm) => {
      track.push(`model.${attribute}.@each.${itm}`);
    });

    return track;
  }
});

export default ArrayRequired;
