import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const {
  get
} = Ember;

const ArrayValid = BaseValidator.extend({
  validate(value /*, options, model, attribute*/ ) {
    let check = value.some((itm) => {
      return get(itm, 'validations.isInvalid');
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
   * @param {String}  attribute   The attribute being evaluated
   * @param {Unknown} options     Options passed into your validator
   * @return {Array}
   */
  getDependentsFor(attribute /*, options */ ) {
    return [`model.${attribute}.@each`];
  }
});

export default ArrayValid;
