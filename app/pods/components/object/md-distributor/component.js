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
  },
  NativeArray
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

export default Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    once(this, function() {
      set(model, 'contact', getWithDefault(model, 'contact', {
        role: null,
        party: []
      }));
      set(model, 'orderProcess', NativeArray.apply(getWithDefault(model,
        'orderProcess', [{}])));
      set(model, 'transferOption', NativeArray.apply(getWithDefault(
        model, 'transferOption', [{}])));
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

  role: computed.alias('model.contact.role'),
  contacts: computed('model.contact.party', {
    get() {
      let party = get(this, 'model.contact.party');
      return party ? party.mapBy('contactId') : null;
    },
    set(key, value) {
      let map = value.map((itm) => {
        return {
          contactId: itm
        };
      });
      set(this, 'model.contact.party', map);
      return value;
    }
  })
});
