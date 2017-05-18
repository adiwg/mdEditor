import Ember from 'ember';
import Template from 'mdeditor/mixins/object-template';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const {
  Component,
  get,
  set,
  Object: EmObject
} = Ember;

const Validations = buildValidations({
  'language': validator('presence', {
    presence: true,
    ignoreBlank: true
  }),
  'characterSet': validator('presence', {
    presence: true,
    ignoreBlank: true
  })
});

export default Component.extend(Template, {
  init() {
    this._super(...arguments);

    let model = get(this, 'model');
    let modelPath = get(this, 'modelPath');
    let value = modelPath ? get(model, modelPath) : model;

    value = this.applyTemplate(value);

    if (modelPath) {
      set(model, modelPath, value);
    }

    set(this, 'value', value);
  },

//value:{},
  /**
   * This templateClass to apply to the supplied model or model.modelPath.
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass: EmObject.extend(Validations, {
    init() {
      this._super(...arguments);
      //this.set('uri', null);
    }
  })
});
