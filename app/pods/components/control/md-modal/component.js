import Component from '@ember/component';
import { action } from '@ember/object';
import classic from 'ember-classic-decorator';

@classic
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
   *
   * @property isShowing
   * @type {Boolean}
   */
  isShowing = false;

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
  target = 'viewport';

  /**
   * Whether to display the confirm button
   *
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
   *
   * @property showCancel
   * @type {Boolean}
   */
  showCancel = false;

  /**
   * Label for the confirm button
   *
   * @property confirmLabel
   * @type {String}
   */
  confirmLabel = 'OK';

  /**
   * Close action callback
   *
   * @method closeModal
   */
  closeModal() {
    this.toggleProperty('isShowing');
  }

  /**
   * Confirm action callback
   * @method confirm
   */
  confirm() {
    if (this.confirmAction) {
      this.confirmAction();
    }
    this.closeModal();
  }

  /**
   * Cancel action callback
   *
   * @method cancel
   */
  cancel() {
    this.closeModal();
  }

  actions = {
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
}
