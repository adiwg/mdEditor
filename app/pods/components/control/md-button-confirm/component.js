import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  isShowingConfirm: false,

  onConfirm(){},

  click() {
    if(this.get('isShowingConfirm')) {
      this.get('onConfirm')();
    } else {
      this.set('isShowingConfirm', true);
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this.$()
      .on('blur', () => {
        this.set('isShowingConfirm', false);
      });
  }
});
