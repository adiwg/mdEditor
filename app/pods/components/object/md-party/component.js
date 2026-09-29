import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import EmberObject, { computed, set } from '@ember/object';
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

@classic
export default class MdPartyComponent extends Component.extend(Validations) {
  attributeBindings = ['data-spy'];

  templateClass = Template;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'party', model.party ?? []);
      set(model, 'role', model.role ?? null);
    });
  }
}

MdPartyComponent.reopen({
  role: alias('model.role'),

  _contacts: computed('model', {
    get() {
      let party = this.model?.party;
      return party ? party.mapBy('contactId') : [];
    },

    set(key, value) {
      let map = value.map((itm) => {
        return {
          contactId: itm,
        };
      });
      set(this, 'model.party', map);
    },
  }),
});

export { Validations, Template };
