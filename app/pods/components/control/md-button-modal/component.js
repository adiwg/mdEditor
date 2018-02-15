import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * mdEditor Component that renders a button which displays a modal
   * dialog when clicked.
   *
   * @class md-button-modal
   * @module mdeditor
   * @submodule components-control
   * @constructor
   */

  tagName: 'button',
  classNames: 'md-button-modal',
  attributeBindings: ['type'],

  /**
   * Element selector or element that serves as the reference for modal position
   *
   * @property target
   * @type {String}
   */
  target: 'html',

  /**
   * A boolean, when true renders the modal without wormholing or tethering
   *
   * @property renderInPlace
   * @type {Boolean}
   */
  renderInPlace: false,

  /**
   * Indicates whether the modal dialog is being displayed.
   * @type {Boolean}
   */
  isShowingModal: false,

  /**
   * The function to call when action is cancelled.
   *
   * @method onCancel
   */
  onCancel() {},

  /**
   * The function to call when action is confirmed.
   *
   * @method onConfirm
   */
  onConfirm() {},

  //click handler, sets modal state
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
