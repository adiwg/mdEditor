import Table from '../../md-array-table/component';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';
import { get, set, getWithDefault } from '@ember/object';
import { validator, buildValidations } from "ember-cp-validations";

const Validations = buildValidations({
  'attrCntType': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

export default Table.extend(Validations,{
  /**
   * mdEditor class for input and edit of mdJSON 'coverageDescription.attributeGroup' object.
   * The class manages the maintenance of an array of attributeGroup objects.
   *
   * ```handlebars
   * \{{object/md-raster/attrgroup
   *    model=model.attributeGroup
   *    profilePath="path"
   * }}
   * ```
   *
   * @module mdeditor
   * @submodule components-object-md-raster
   * @constructor
   * @class md-raster-attrgroup
   * @uses md-array-table
   */

  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    if(model) {
      once(this, function () {
        set(model, 'attributeContentType', getWithDefault(model,
          'attributeContentType', []));
        set(model, 'attribute', getWithDefault(model,
          'attribute', []));
      });
    }
  },

  /**
   * attrCntType is the alias for 'attributeContentType' used in the validations for the
   * 'attributeGroup' object.
   *
   * @property attrCntType
   * @type String
   * @requires alias
   * @default "alias('model.attrbuteContenType')"
   */
  attrCntType: alias('model.attributeContentType'),

  tagName: 'form',

  actions: {
     /**
      * 'editAttribute' is an crud action for the 'attributeGroup' object that transitions users to
      * the 'attribute' route for editing.
      * @method editAttribute
      * @param {Number} index
      */
    editAttribute(index) {
      this.editAttribute(index)
    },
    /**
     * 'deleteAttribute' is an crud action for the 'attributeGroup' object that deletes 'attribute' objects.
     * @method deleteAttribute
     * @param {Number} index
     */
    deleteAttrGroup(index) {
      this.deleteAttrGroup(index)
    },
    /**
     * 'addAttrGroup' is an crud action for the 'attributeGroup' object that adds 'attribute' objects.
     * @method addAttrGroup
     */
    addAttrGroup() {
      this.addAttrGroup();
    }
  }
});

export { Validations };
