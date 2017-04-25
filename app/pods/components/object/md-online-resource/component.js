import Ember from 'ember';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const {
  Component,
  getOwner,
  Object: EmObject,
  set,
  inject,
  // isArray,
  // merge,
  get
} = Ember;

const regex = new RegExp("([A-Za-z][A-Za-z0-9+\\-.]*):(?:(//)(?:((?:[A-Za-z0-9\\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*)@)?((?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&'()*+,;=:]+)\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*))(?::([0-9]*))?((?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|/((?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?)|((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|)(?:\\?((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?(?:\\#((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?");

const Validations = buildValidations({
  'uri': [
    validator('format', {
      regex: regex,
      isWarning: true,
      message: 'This field should be a valid, resolvable uri.'
    }),
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    })
  ]
});

const theComp = Component.extend({
  init() {
    this._super(...arguments);

    let plain = this.get('model');

    if (plain && !get(plain,'validations')) {
      const Model = EmObject.extend(Validations, plain);
      const owner = getOwner(this);

      let model = Model.create(owner.ownerInjection(), plain);
      this.set('model', model);
    }
  },

  flashMessages: inject.service(),
  classNames: ['md-online-resource'],
  attributeBindings: ['data-spy'],

  /**
   * Display the image picker and preview
   *
   * @property imagePicker
   * @type {Boolean}
   * @default undefined
   */

  actions: {
    handleFile(file) {
      if (file.size > 50000) {
        get(this, 'flashMessages')
          .danger(
            `The image exceeded the maximum size of 50KB: ${file.size} bytes.
            Please use an online URL to load the image.`
          );
      } else {
        let model = this.get('model');

        set(model, 'name', file.name);
        set(model, 'uri', file.data);

        if (file.size > 25000) {
          get(this, 'flashMessages')
            .warning(
              `The image exceeded the recommended size of 25KB: ${file.size} bytes`
            );
        }
        //reset the input field
        //this.$('.import-file-picker input:file').val('');
      }
    }
  }
});

export {
  Validations,
  theComp as
  default
};
