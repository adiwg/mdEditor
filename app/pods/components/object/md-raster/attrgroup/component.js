import Table from '../../md-array-table/component';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';
import { set } from '@ember/object';
import classic from 'ember-classic-decorator';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  attrCntType: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
});

/**
 * mdEditor class for input and edit of mdJSON 'coverageDescription.attributeGroup'
 * object. The class manages the maintenance of an array of attributeGroup objects.
 *
 * ```handlebars
 * {{object/md-raster/attrgroup
 *   model=model.attributeGroup
 *   profilePath="path"
 * }}
 * ```
 *
 * @module mdeditor
 * @submodule components-object-md-raster
 * @class md-raster-attrgroup
 * @extends md-array-table
 */
@classic
export default class MdRasterAttrgroupComponent extends Table.extend(Validations) {
  editAttribute = null;

  deleteAttrGroup = null;

  addAttrGroup = null;

  tagName = 'form';

  attrCntType = alias('model.attributeContentType');

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    if (model) {
      once(this, function () {
        set(
          model,
          'attributeContentType',
          model.attributeContentType ?? []
        );
        set(model, 'attribute', model.attribute ?? []);
      });
    }
  }

  actions = {
    handleEditAttribute(index) {
      if (this.editAttribute) {
        this.editAttribute(index);
      }
    },

    handleDeleteAttrGroup(index) {
      if (this.deleteAttrGroup) {
        this.deleteAttrGroup(index);
      }
    },

    handleAddAttrGroup() {
      if (this.addAttrGroup) {
        this.addAttrGroup();
      }
    },
  };
}

export { Validations };
