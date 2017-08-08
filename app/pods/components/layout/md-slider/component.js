import Ember from 'ember';

const {
  Component,
  $
} = Ember;

export default Component.extend({
  classNames: ['md-slider'],
  classNameBindings: ['visible:in'],
  visible: false,

  didReceiveAttrs() {
    $('body').toggleClass('slider', this.get('visible') === true);

  },
  actions: {
    toggleVisibility() {
      this.toggleProperty('visible');
    }
  }
});
