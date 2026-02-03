import Component from '@ember/component';
import EmberObject, { set, get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { once } from '@ember/runloop';

import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
  value: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
  definition: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
});

const TemplateClass = EmberObject.extend(Validations, {
  init() {
    this._super(...arguments);

    set(this, 'reference', {});
  },
});

const theComp = Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'reference', get(model, 'reference') ?? {});
    });
  },

  /**
   * The string representing the path in the profile object for the domain.
   *
   * @property profilePath
   * @type {String}
   * @default 'false'
   * @required
   */

  /**
   * The object to use as the data model for the domain.
   *
   * @property model
   * @type {Object}
   * @required
   */

  tagName: 'form',
  name: alias('model.name'),
  value: alias('model.value'),
  definition: alias('model.definition'),
});

export { Validations, TemplateClass as Template, theComp as default };
