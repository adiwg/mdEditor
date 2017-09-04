import Ember from 'ember';
const {
  Component,
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

  actions: {
    showSlider() {
      let slider = this.get('slider');

      slider.set('fromName', 'md-slider-error');
      slider.toggleSlider(true);
    }
  }
});
