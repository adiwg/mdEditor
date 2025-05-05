import Component from '@ember/component';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default class MdModalComponent extends Component {
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
   * @property isShowing
   * @type {Boolean}
   */
  isShowing = false;

  /**
   * Text to display in the modal.
   * @property message
   * @type {String}
   */
  message = null;

  /**
   * Element selector or element that serves as the reference for modal position
   *
   * @property target
   * @type {String}
   */
  target = 'viewport';

  /**
   * Whether to display the confirm button
   * @property showConfirm
   * @type {Boolean}
   */
  showConfirm = false;

  /**
   * Whether to render in place
   *
   * @property renderInPlace
   * @type {Boolean}
   */
  renderInPlace = false;

  /**
   * Whether to display the cancel button
   * @property showCancel
   * @type {Boolean}
   */
  showCancel = false;

  /**
   * Label for the confirm button
   * @property confirmLabel
   * @type {String}
   */
  confirmLabel = 'OK';

  /**
   * Close action callback
   */
  closeModal() {
    this.set('isShowing', false);
  }

  /**
   * Confirm action callback
   */
  confirm() {
    console.log('confirm');
    // Call the onConfirm callback if it exists
    if (typeof this.onConfirm === 'function') {
      this.onConfirm();
    }
    this.closeModal();
  }

  /**
   * Cancel action callback
   */
  cancel() {
    this.closeModal();
  }

  @action
  handleClose() {
    this.closeModal();
  }

  @action
  handleConfirm() {
    console.log('handleConfirm');
    this.confirm();
  }

  @action
  handleCancel() {
    this.cancel();
  }
}
