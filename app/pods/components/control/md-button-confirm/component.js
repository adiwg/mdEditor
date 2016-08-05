import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: 'md-button-modal',
  isShowingConfirm: false,

  /**
   * The function to call when action is confirmed.
   *
   * @method onConfirm
   * @return {[type]} [description]
   */
  onConfirm(){},

  //click handler, sets button state
  click() {
    if(this.get('isShowingConfirm')) {
      this.get('onConfirm')();
    } else {
      this.set('isShowingConfirm', true);
    }
  },

  //cancel confirm state on button blur
  didInsertElement() {
    this._super(...arguments);
    this.$()
      .on('blur', () => {
        this.set('isShowingConfirm', false);
      });
  }
});
