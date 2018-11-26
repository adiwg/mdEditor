import { assert } from '@ember/debug';
import { get } from '@ember/object';
import { isArray } from '@ember/array';
import BaseValidator from 'ember-cp-validations/validators/base';

const ArrayRequired = BaseValidator.extend({
  validate(value) {
    if(isArray(value)) {
      if(value.length) {
        return true;
      }
    }
    return 'At least one item is required.';
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
   * @param {String}  attribute   The attribute being evaluated
   * @param {Unknown} options     Options passed into your validator
   * @return {Array}
   */
  getDependentsFor(attribute, options) {
    //return[];
    let track = [];
    let opts = get(options, 'track');

    assert(
      `[validator:array-valid] [${attribute}] option 'track' must be an array`,
      isArray(opts));

    opts.forEach((itm) => {
      track.push(`model.${attribute}.@each.${itm}`);
    });

    return track;
  }
});

export default ArrayRequired;
