import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  slider: inject(),

  tagName: 'button',
  classNames: ['btn'],
  attributeBindings: ['type'],
  type: 'button',

  text: 'Preview JSON',
  icon: 'binoculars',
  json: computed(function () {
    return {};
  }),
  hideSlider: true,
  propagateClick: false,

  click(evt) {
    //this.set('preview', true);
    if (!this.propagateClick) {
      evt.stopPropagation();
    }
    this.showSlider();
  },

  _close() {
    this.set('preview', false);
    this.set('hideSlider', true);
  },

  showSlider() {
    let slider = this.slider;

    slider.set('fromName', 'md-slider-json');
    slider.set('onClose', this._close);
    slider.set('context', this);
    slider.toggleSlider(true);
    this.set('hideSlider', false);
  },

  actions: {
    close() {
      this._close;
    },
    showSlider() {
      this.showSlider();
    },
  },
});
