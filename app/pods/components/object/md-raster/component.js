import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';
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

@classic
export default class MdRasterComponent extends Component.extend(Validations) {
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

  tagName = 'form';

  /**
  * 'name' is the alias for 'coverageName' used in the validations for the
  * 'raster' object.
  *
  * @property name
  * @type String
  * @requires alias
  * @default "alias('model.coverageName')"
  */
  @alias('model.coverageName') name;

  /**
   * 'description' is the alias for 'coverageDescripiton' used in the validations for the
   * 'raster' object.
   *
   * @property description
   * @type String
   * @requires alias
   * @default "alias('model.coverageDescription')"
   */
  @alias('model.coverageDescription') description;

  /**
   * 'identifier' is the alias for 'processLevelCode.identifier' used in the validations
   * for the 'coverageDescription.processLevelCode' object.
   *
   * @property identifier
   * @type String
   * @requires alias
   * @default "alias('model.processLevelCode.identifier')"
   */
  @alias('model.processLevelCode.identifier') identifier;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    if (model) {
      once(this, function () {
        model.attributeGroup = model.attributeGroup ?? [];
        model.imageDescription = model.imageDescription ?? {};
        model.processingLevelCode = model.processingLevelCode ?? {};
      });
    }
  }
}

export { Validations };
