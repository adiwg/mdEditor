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
      //console.info(file);
      let model = this.get('model');

      set(model, 'name', file.name);
      set(model, 'uri', file.data);

      if(file.size > 25000) {
        get(this, 'flashMessages')
          .warning(
            `The image exceeded the recommended size of 25KB: ${file.size} bytes`
          );
      }
      //reset the input field
      //this.$('.import-file-picker input:file').val('');
    }
  }
});
