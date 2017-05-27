import Ember from 'ember';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const {
  computed,
  Component
} = Ember;

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
  date: computed.alias('model.date'),
  dateType: computed.alias('model.dateType')

});
