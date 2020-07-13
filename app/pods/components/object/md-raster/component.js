import Component from '@ember/component';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';
import { get, set, getWithDefault } from '@ember/object';
import { validator, buildValidations } from "ember-cp-validations";

const Validations = buildValidations({
  'name': [
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
  ],
  'identifier': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

export default Component.extend(Validations, {
  tagName: 'form',
    didReceiveAttrs() {
      this._super(...arguments);

      let model = get(this, 'model');

      if (model) {
        once(this, function () {
          set(model, 'attributeGroup', getWithDefault(model,
            'attributeGroup', []));
          set(model, 'imageDescription', getWithDefault(model,
            'imageDescription', {}));
          set(model, 'processingLevelCode', getWithDefault(model,
            'processingLevelCode', {}));
        })
      }
    },

     /**
      * The string representing the path in the profile object for the resource.
      *
      * @property profilePath
      * @type {String}
      * @default 'false'
      * @required
      */

     /**
      * The object to use as the data model for the resource.
      *
      * @property model
      * @type {Object}
      * @required
      */

    name: alias('model.coverageName'),
    description: alias('model.coverageDescription'),
    identifier: alias('model.processLvlCode.identifier'),
});

export { Validations };
