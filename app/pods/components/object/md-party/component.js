import Component from '@ember/component';
import EmberObject, { computed, get, set } from '@ember/object';
import { A } from '@ember/array';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  role: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
  _contacts: validator('length', {
    min: 1,
    message: 'At least one contact is required.',
  }),
});

const Template = EmberObject.extend(Validations, {
  init() {
    this._super(...arguments);
    this.set('party', A());
    this.set('role', null);
  },
  _contacts: computed('party', {
    get() {
      let party = this.party;
      return party.mapBy('contactId');
    },
    set(key, value) {
      let map = value.map((itm) => {
        return {
          contactId: itm,
        };
      });
      set(this, 'party', map);
      return value;
    },
  }),
});

const theComp = Component.extend(Validations, {
  _contacts: computed('model', {
    get() {
      let party = get(this, 'model.party');
      return party ? party.mapBy('contactId') : [];
    },
    set(key, value) {
      let map = value.map((itm) => {
        return {
          contactId: itm,
        };
      });
      set(this, 'model.party', map);
      return value;
    },
  }),

  role: alias('model.role'),
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'party', get(model, 'party') ?? []);
      set(model, 'role', get(model, 'role') ?? null);
    });
  },

  attributeBindings: ['data-spy'],
  templateClass: Template,
});

export { Validations, Template, theComp as default };
