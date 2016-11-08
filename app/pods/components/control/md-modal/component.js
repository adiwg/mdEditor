import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * Whether to display the modal
   *
   * @prop isShowing
   * @type {Boolean}
   */
  isShowing: false,

  /**
   * Text to display in the modal.
   * Note: This string is NOT escaped in the template.
   *
   * @property message
   * @type {String}
   */

   /**
    * Element selector or element that serves as the reference for modal position
    *
    * @property target
    * @type {String}
    */
   target: 'html',

  /**
   * Whether to display the confirm button
   *
   * @property showConfirm
   * @type {Boolean}
   */
  showConfirm: false,

  /**
   * Whether to render in place
   *
   * @property renderInPlace
   * @type {Boolean}
   */
  renderInPlace: false,

  /**
   * Whether to display the cancel button
   *
   * @property showCancel
   * @type {Boolean}
   */
  showCancel: false,

  /**
   * Label for the confirm button
   *
   * @property confirmLabel
   * @type {String}
   */
  confirmLabel: 'OK',

  /**
   * Close action callback
   */
  closeModal() {
    this.set('isShowing', false);
  },

  /**
   * Confirm action callback
   */
  confirm() {
    this.closeModal();
  },

  /**
   * Cancel action callback
   */
  cancel() {
    this.closeModal();
  },

  actions: {
    closeModal() {
      this.closeModal();
    },

    confirm() {
      this.confirm();
    },

    cancel() {
      this.cancel();
    }
  }
});
