import Component from '@ember/component';
import {
  computed
} from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  classNames: ['md-slider'],
  classNameBindings: ['visible:in'],
  visible: false,

  didReceiveAttrs() {
    $('body')
      .toggleClass('slider', this.get('visible') === true);
  },

  fromName: null,

  name: computed('fromName', function () {
    return this.get('fromName') || 'md-slider-content';
  }),

  actions: {
    toggleVisibility() {
      this.toggleProperty('visible');

      if(!this.get('visible')) {
        let context = this.get('context');

        this.set('fromName', null);

        if(!context.isDestroying) {
          this.get('onClose')
            .call();
        }
      }
    }
  }
});
