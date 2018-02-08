import Component from '@ember/component';
import EmberObject from '@ember/object';
import {
  set,
  getWithDefault,
  get
} from '@ember/object';
import {
  alias
} from '@ember/object/computed';
import {
  once
} from '@ember/runloop';

import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'codeName': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'dataType': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'allowNull': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'definition': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});


const TemplateClass = EmberObject.extend(Validations, {
  init() {
    this._super(...arguments);

    set(this, 'allowNull', false);
    set(this, 'attributeReference', {});
    set(this, 'alias',[]);
    set(this, 'valueRange',[]);
    set(this, 'timePeriod',[]);
  }
});

const theComp = Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    once(this, function () {
      set(model, 'allowNull', getWithDefault(model, 'allowNull', false));
      set(model, 'reference', getWithDefault(model, 'reference', {}));
      set(model, 'alias', getWithDefault(model, 'alias', []));
      set(model, 'valueRange', getWithDefault(model, 'valueRange', []));
      set(model, 'timePeriod', getWithDefault(model, 'timePeriod', []));
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
  codeName: alias('model.codeName'),
  dataType: alias('model.dataType'),
  definition: alias('model.definition'),
  allowNull: alias('model.allowNull')
});

export {
  Validations,
  TemplateClass as Template,
  theComp as
  default
};
