import { isArray } from '@ember/array';
import BaseValidator from 'ember-cp-validations/validators/base';

const ArrayValid = BaseValidator.extend({
  /**
  * Validation that checks validity of all array members
  *
  * @module mdeditor
  * @submodule validator
  * @class array-valid
  * @extends BaseValidator
  * @example
  *   validator('array-valid')
  */
  validate(value /*, options, model, attribute*/ ) {
    // array-required (this validator's usual sibling) already handles the
    // "must have at least one item" case - a missing/non-array value here
    // has no items to be invalid, so it's trivially valid from this
    // validator's perspective, matching array-required.js's isArray guard.
    if (!isArray(value)) {
      return true;
    }

    let check = value.some((itm) => {
      return itm.validations?.isInvalid;
    });
    return check ? 'At least one item is invalid.' : true;
  }
});

ArrayValid.reopenClass({
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
  getDependentsFor(attribute /*, options */ ) {
    return [`model.${attribute}.@each`];
  }
});

export default ArrayValid;
