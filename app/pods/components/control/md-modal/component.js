import Component from '@ember/component';

export default Component.extend({
  /**
   * @module mdeditor
   * @submodule components-control
   */

  /**
   * Modal dialog with buttons.
   *
   * @class md-modal
   */

  /**
   * Whether to display the modal
   *
   * @property isShowing
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
  target: 'viewport',

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
   *
   * @method closeModal
   */
  closeModal() {
    this.set('isShowing', false);
  },

  /**
   * Confirm action callback
   * @method confirm
   */
  confirm() {
    this.closeModal();
  },

  /**
   * Cancel action callback
   *
   * @method cancel
   */
  cancel() {
    this.closeModal();
  },

  actions: {
    /**
     * Close modal action
     *
     * @method action.closeModal
     */
    closeModal() {
      this.closeModal();
    },

    /**
     * confirm action
     *
     * @method action.confirm
     */
    confirm() {
      this.confirm();
    },

    /**
     * Cancel action
     *
     * @method action.cancel
     */
    cancel() {
      this.cancel();
    }
  }
});
