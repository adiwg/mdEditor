import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { getWithDefault, get, set, computed } from '@ember/object';
import { once } from '@ember/runloop';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import { A } from '@ember/array';

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

    let model = this.model;

    once(this, function() {
      set(model, 'contact', (model.contact === undefined ? {
        role: null,
        party: []
      } : model.contact));
      set(model, 'orderProcess', A((model.orderProcess === undefined ? [{}] : model.orderProcess)));
      set(model, 'transferOption', A((model.transferOption === undefined ? [{}] : model.transferOption)));
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

  role: alias('model.contact.role'),
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
  }),

  actions: {
    editTransferOption(index){
      this.editTransferOption(index);
    }
  }
});
