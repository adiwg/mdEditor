import Ember from 'ember';

const {
  Component,
  set,
  inject,
  get
} = Ember;

export default Component.extend({
  flashMessages: inject.service(),
  classNames: ['md-online-resource'],

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
      }else{
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
