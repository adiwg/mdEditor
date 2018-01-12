import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  slider: inject(),

  tagName: 'button',
  classNames: ['btn'],
  attributeBindings: ['type'],
  type: 'button',

  text: 'Preview JSON',
  icon: 'binoculars',
  json: {},
  hideSlider: true,
  propagateClick:false,

  click(evt) {
    //this.set('preview', true);
    if(!this.get('propagateClick')) {
      evt.stopPropagation();
    }
    this.showSlider();
  },

  _close() {
    this.set('preview', false);
    this.set('hideSlider', true);
  },

  showSlider() {
    let slider = this.get('slider');

    slider.set('fromName', 'md-slider-json');
    slider.set('onClose', this.get('_close'));
    slider.set('context', this);
    slider.toggleSlider(true);
    this.set('hideSlider', false);
  },

  actions: {
    close() {
      this.get('_close');
    },
    showSlider() {
      this.showSlider();
    }
  }
});
