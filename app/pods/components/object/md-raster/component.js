import Component from '@ember/component';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';
import { get, set, getWithDefault } from '@ember/object';
import { validator, buildValidations } from "ember-cp-validations";
import { inject as service } from '@ember/service';

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

    router: service(),

    classNames: ['form'],
    name: alias('model.coverageName'),
    description: alias('model.coverageDescription'),
    processLvlCode: alias('model.processingLevelCode'),
    identifier: alias('processLvlCode.identifier'),

    actions: {
      editAttrGroup(id) {
        this.router.transitionTo('record.show.edit.spatial.raster', this.parentModel.id, id)
      },
    },
});

export { Validations };
