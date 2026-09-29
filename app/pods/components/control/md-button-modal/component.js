import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action } from '@ember/object';

@classic
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

  tagName = 'button';
  classNames = ['md-button-modal'];
  attributeBindings = ['type'];

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
   * Indicates whether the modal dialog is being displayed.
   *
   * @property isShowingModal
   * @type {Boolean}
   */
  isShowingModal = false;

  /**
   * The function to call when action is cancelled.
   *
   * @method onCancel
   */
  onCancel() {}

  /**
   * The function to call when action is confirmed.
   *
   * @method onConfirm
   */
  onConfirm() {}

  //click handler, sets modal state
  click() {
    this.toggleProperty('isShowingModal');
  }

  @action
  toggleModal() {
    this.toggleProperty('isShowingModal');
  }

  @action
  cancel() {
    this.onCancel();
    this.toggleProperty('isShowingModal');
  }

  @action
  confirm() {
    this.onConfirm();
    this.toggleProperty('isShowingModal');
  }
}
