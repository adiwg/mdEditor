import Ember from 'ember';

const {
  Service
} = Ember;

export default Service.extend({
  showSlider: false,
  fromName: 'md-slider-content',
  onClose() {},

  toggleSlider(state) {
    if(state === undefined) {
      this.toggleProperty('showSlider');

      return;
    }

    this.set('showSlider', !!state);
  }
});
