import Component from '@ember/component';
import {
  computed
} from '@ember/object';

export default Component.extend({
  classNames: ['md-slider'],
  classNameBindings: ['visible:in'],
  visible: false,

  didReceiveAttrs() {
    if (this.visible === true) {
      document.body.classList.add('slider');
    } else {
      document.body.classList.remove('slider');
    }
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
