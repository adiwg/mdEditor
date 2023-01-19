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
      .toggleClass('slider', this.visible === true);
  },

  fromName: null,

  name: computed('fromName', function () {
    return this.fromName || 'md-slider-content';
  }),

  actions: {
    toggleVisibility() {
      this.toggleProperty('visible');

      if(!this.visible) {
        let context = this.get('context.isDestroying');

        this.set('fromName', null);

        if(!context) {
          this.onClose
            .call(this);
        }
      }
    }
  }
});
