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
  Object: EmObject,
  computed,
  copy,
  isNone,
  inject: {
    service
  }
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
  settings: service(),

  init() {
    this._super(...arguments);

    let main = this.get('model');
    let modelPath = get(this, 'modelPath');
    let model = modelPath ? get(main, modelPath) : main;
    let settings = get(this, 'settings.data');

    //let model = get(model, modelPath);

    if(isNone(model) || Object.keys(model).length === 0) {
      model = EmObject.create(this.applyTemplate(model, {
        language: copy(settings.get('language')),
        characterSet: copy(settings.get('characterSet')),
        country: copy(settings.get('country'))
      }));
    }

    if(modelPath) {
      set(main, modelPath, model);
    }

  },

  propPath: computed('modelPath', function () {
    return get(this, 'modelPath') ? get(this, 'modelPath') + '.' : '';
  }),
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
    }
  })
});
