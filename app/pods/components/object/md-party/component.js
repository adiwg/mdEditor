import classic from 'ember-classic-decorator';
import { attributeBindings } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import EmberObject, { get, getWithDefault, set, computed } from '@ember/object';
import {
  A
} from '@ember/array';
import {
  once
} from '@ember/runloop';
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
  '_contacts': validator('length', {
    min: 1,
    message: 'At least one contact is required.'
  })
});

@classic
class Template extends EmberObject.extend(Validations) {
  init() {
    super.init(...arguments);
    this.set('party', A());
    this.set('role', null);
  }

  @computed('party')
  get _contacts() {
    let party = this.party;
    return party.mapBy('contactId');
  }

  set _contacts(value) {
    let map = value.map((itm) => {
      return {
        contactId: itm
      };
    });
    set(this, 'party', map);
    return value;
  }
}

@classic
@attributeBindings('data-spy')
class theComp extends Component.extend(Validations) {
  @computed('model')
  get _contacts() {
    let party = get(this, 'model.party');
    return party ? party.mapBy('contactId') : [];
  }

  set _contacts(value) {
    let map = value.map((itm) => {
      return {
        contactId: itm
      };
    });
    set(this, 'model.party', map);
    return value;
  }

  @alias('model.role')
  role;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'party', getWithDefault(model, 'party', []));
      set(model, 'role', getWithDefault(model, 'role', null));
    });
  }

  templateClass = Template;
}

export {
  Validations,
  Template,
  theComp as
  default
};
