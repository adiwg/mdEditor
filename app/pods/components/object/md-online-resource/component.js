import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    handleFile(file) {
      console.info(file);
      let model = this.get('model');

      model.set('name', file.name);
      model.set('uri', file.data);
      //reset the input field
      //this.$('.import-file-picker input:file').val('');
    }
  }
});
