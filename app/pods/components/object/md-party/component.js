import Component from '@ember/component';
import EmberObject from '@ember/object';
import {
  A
} from '@ember/array';
import {
  once
} from '@ember/runloop';
import {
  computed,
  defineProperty,
  get,
  set
} from '@ember/object';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import ObjectTemplate from 'mdeditor/mixins/object-template';

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

const theComp = Component.extend(ObjectTemplate, {
  init() {
    this._super(...arguments);

    let path = this.get('path');
    let model = this.get('model');

    defineProperty(this, 'party', computed(
      "model."+path,
      function () {
        if(model && path) {
          return get(model, path);
        }
        return model;
      }));
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let path = this.get('path');
    let model = this.get('model');

    if(model && path) {
      let obj = get(this, 'model.' + path);

      once(this, function () {
        set(model, path, this.applyTemplate(obj));
      });
    }
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
