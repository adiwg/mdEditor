import Component from '@ember/component';
import EmberObject from '@ember/object';
import {
  A
} from '@ember/array';
import {
  once
} from '@ember/runloop';
import {
  alias
} from '@ember/object/computed';
import {
  computed,
  get,
  getWithDefault,
  set
} from '@ember/object';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

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

const Template = EmberObject.extend(Validations, {
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
});

const theComp = Component.extend(Validations, {
  contacts: computed('model', {
    get() {
      let party = get(this, 'model.party');
      return party ? party.mapBy('contactId') : [];
    },
    set(key, value) {
      let map = value.map((itm) => {
        return {
          contactId: itm
        };
      });
      set(this, 'model.party', map);
      return value;
    }
  }),

  role: alias('model.role'),
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'party', getWithDefault(model, 'party', []));
      set(model, 'role', getWithDefault(model, 'role', null));
    });
  },

  attributeBindings: ['data-spy'],
  templateClass: Template
});

export {
  Validations,
  Template,
  theComp as
  default
};
