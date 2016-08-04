import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  isShowingModal: false,

  onCancel() {},

  onConfirm() {},

  click() {
    this.toggleProperty('isShowingModal');
  },

  actions: {
    toggleModal() {
      this.toggleProperty('isShowingModal');
    },
    cancel() {
      this.get('onCancel')();
      this.toggleProperty('isShowingModal');
    },
    confirm() {
      this.get('onConfirm')();
      this.toggleProperty('isShowingModal');
    }
  }
});
