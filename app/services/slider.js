import Ember from 'ember';

const {
  Service
} = Ember;

export default Service.extend({
  showSlider: false,
  fromName: 'md-slider-content',

  toggleSlider(state) {
    if(state === undefined) {
      this.toggleProperty('showSlider');

      return;
    }

    this.set('showSlider', !!state);
  }
});
