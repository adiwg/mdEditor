import { get } from '@ember/object';
import EmberObject, { getWithDefault, set } from '@ember/object';
import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { once } from '@ember/runloop';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'specimen': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'repository': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

const Template = EmberObject.extend(Validations, {
  init() {
    this._super(...arguments);
    this.set('repository', {});
    this.set('specimen', null);
  }
});

const theComp = Component.extend(Validations, {
  classNames: ['form'],
  specimen: alias('model.specimen'),
  repository: alias('model.repository'),
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'repository', (model.repository === undefined ? {} : model.repository));
      set(model, 'specimen', (model.specimen === undefined ? null : model.specimen));
    });
  },

  //attributeBindings: ['data-spy'],
  templateClass: Template
});

export {
  Validations,
  Template,
  theComp as
  default
};
