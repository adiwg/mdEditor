import { alias, and } from '@ember/object/computed';
import Component from '@ember/component';
import { getWithDefault, set } from '@ember/object';
import {
  once
} from '@ember/runloop';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'identifier': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

const theComp = Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = getWithDefault(this, 'model', {}) || {};

    once(this, function () {
      set(model, 'authority', getWithDefault(model, 'authority',
        {}));
    });
  },

  classNames: ['md-identifier'],
  attributeBindings: ['data-spy'],

  /**
   * The identifier object to render
   *
   * @property model
   * @type {object}
   * @required
   */

  /**
   * Render short form of the identifier template, i.e. no authority
   *
   * @property short
   * @type {Boolean}
   */

  /**
   * Determines whether to render identifier field with confirmation button
   *
   * @property confirmIdentifier
   * @type {Boolean}
   */

  identifier: alias('model.identifier'),
  collapsible: false,
  collapse: true,
  isCollapsed: and('collapsible', 'collapse'),
});

export {
  Validations,
  theComp as
  default
};
