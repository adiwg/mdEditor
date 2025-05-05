import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MdButtonModalComponent extends Component {
  /**
   * mdEditor Component that renders a button which displays a modal
   * dialog when clicked.
   *
   * @class md-button-modal
   * @module mdeditor
   * @submodule components-control
   * @constructor
   */

  /**
   * Element selector or element that serves as the reference for modal position
   *
   * @property target
   * @type {String}
   */
  target = 'html';

  /**
   * A boolean, when true renders the modal without wormholing or tethering
   *
   * @property renderInPlace
   * @type {Boolean}
   */
  renderInPlace = false;

  /**
   * Indicates whether the form modal dialog is being displayed.
   * @property formModalActive
   * @type {Boolean}
   */
  @tracked formModalActive = false;

  /**
   * The function to call when action is cancelled.
   * @method onCancel
   */
  onCancel() {}

  /**
   * The function to call when action is confirmed.
   * @method onConfirm
   */
  onConfirm() {}

  @action
  activateModal(propertyName) {
    this[propertyName] = true;
  }

  @action
  deactivateModal(propertyName) {
    this[propertyName] = false;
  }

  @action
  cancel() {
    // Call the provided onCancel function if it exists
    if (typeof this.onCancel === 'function') {
      this.onCancel();
    }
    this.formModalActive = false;
  }

  @action
  confirm() {
    // Call the provided onConfirm function if it exists
    if (typeof this.onConfirm === 'function') {
      this.onConfirm();
    }
    this.formModalActive = false;
  }
}
