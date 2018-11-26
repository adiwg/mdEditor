import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  date: validator('presence', {
    presence: true,
    ignoreBlank: true
  }),
  dateType: validator('presence', {
    presence: true,
    ignoreBlank: true
  })
});

export default Component.extend(Validations, {
  init() {
    this._super(...arguments);

    // if(isNone(get(this, 'model'))) {
    //   set(this, 'model', {});
    // }
  },

  tagName:'',
  date: alias('model.date'),
  dateType: alias('model.dateType')

});
