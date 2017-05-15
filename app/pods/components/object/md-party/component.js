import Ember from 'ember';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const {
  Component,
  computed,
  Object: EmObject,
  A,
  get,
  set
} = Ember;

const Validations = buildValidations({
  'role': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'contacts': validator('length', {
    min: 1,
    message: 'At least one contact is required.'
  })
});

export default Component.extend({
  attributeBindings: ['data-spy'],

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass: EmObject.extend(Validations, {
    init() {
      this._super(...arguments);
      this.set('party', A());
      this.set('role', null);
    },
    contacts: computed('party', {
      get() {
        let party = get(this, 'party');
        return party.mapBy('contactId');
      },
      set(key, value) {
        let map = value.map((itm) => {
          return {
            contactId: itm
          };
        });
        set(this, 'party', map);
        return value;
      }
    })
  })
});
