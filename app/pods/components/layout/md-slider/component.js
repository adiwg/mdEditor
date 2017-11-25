import Ember from 'ember';

const {
  Component,
  computed,
  $
} = Ember;

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
        this.set('fromName', null);
        this.get('onClose').call(this.get('context'));
      }
    }
  }
});
