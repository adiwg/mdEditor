import Component from '@ember/component';
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
import uuidV4 from "uuid/v4";

const Validations = buildValidations({
  'domainId': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'codeName': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'description': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

export default Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    once(this, function () {
      set(model, 'domainId', getWithDefault(model, 'domainId', uuidV4()));
      set(model, 'domainItem', getWithDefault(model, 'domainItem', []));
      set(model, 'domainReference', getWithDefault(model,
        'domainReference', {}));
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
  domainId: alias('model.domainId'),
  codeName: alias('model.codeName'),
  description: alias('model.description')
});
