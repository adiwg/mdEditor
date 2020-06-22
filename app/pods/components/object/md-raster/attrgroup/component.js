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
  tagName: 'form',
    didReceiveAttrs() {
      this._super(...arguments);

      let model = get(this, 'model');

      if(model) {
        once(this, function () {
          set(model, 'attributeContentType', getWithDefault(model,
            'attributeContentType', []));
          set(model, 'attribute', getWithDefault(model,
            'attribute', []));
        });
      }
    },

    attrCntType: alias('model.attributeContentType'),

    actions: {
      editAttribute(index) {
        this.editAttribute(index)
      },
      deleteAttrGroup(index) {
        this.deleteAttrGroup(index)
      },
      addAttrGroup() {
        this.addAttrGroup();
      }
    }
});

export { Validations };
