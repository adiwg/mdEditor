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
  /**
    * mdEditor class for input and edit of mdJSON 'coverageDescription' object.
    * The class manages the maintenance of an array of raster(coverageDescription) objects.
    *
    ```handlebars
    * \{{object/md-raster
    *     model=coverageDescription
    *     profilePath="path"
    * }}
    * ```
    * @module mdeditor
    * @submodule components-object
    * @class md-raster
    * @constructor
  */

    didReceiveAttrs() {
      this._super(...arguments);

      let model = this.model;

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

    tagName: 'form',

    /**
    * 'name' is the alias for 'coverageName' used in the validations for the
    * 'raster' object.
    *
    * @property name
    * @type String
    * @requires alias
    * @default "alias('model.coverageName')"
    */
    name: alias('model.coverageName'),

    /**
     * 'description' is the alias for 'coverageDescripiton' used in the validations for the
     * 'raster' object.
     *
     * @property description
     * @type String
     * @requires alias
     * @default "alias('model.coverageDescription')"
     */
    description: alias('model.coverageDescription'),

    /**
     * 'identifier' is the alias for 'processLevelCode.identifier' used in the validations
     * for the 'coverageDescription.processLevelCode' object.
     *
     * @property identifier
     * @type String
     * @requires alias
     * @default "alias('model.processLevelCode.identifier')"
     */
    identifier: alias('model.processLevelCode.identifier'),
});

export { Validations };
