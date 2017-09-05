import Ember from 'ember';
const {
  Component,
  get,
  inject
} = Ember;

export default Component.extend({
  slider: inject.service(),
  tagName: 'span',
  classNames: ['md-status'],


  /**
   * Model to display status for.
   *
   * @property model
   * @type {DS.model}
   * @required
   */

  isBtn: false,
  btnSize: 'sm',

  actions: {
    showSlider() {
      let slider = this.get('slider');

      slider.set('fromName', 'md-slider-error');
      slider.toggleSlider(true);
    },

    saveRecord() {
      let model = this.get('model');

      model.save()
        .then(() => {
          get(this, 'flashMessages')
            .success(`Saved Record: ${model.get('title')}`);
        });
    }
  }
});
