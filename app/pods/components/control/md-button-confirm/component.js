import Component from '@ember/component';

export default Component.extend({
  tagName: 'button',
  classNames: 'md-button-confirm',
  attributeBindings: ['type', 'disabled'],
  type: 'button',
  isShowingConfirm: false,
  propagateClick: false,
  disabled: null,

  /**
   * Tooltip text shown when isShowingConfirm is true
   *
   * @property tooltip
   * @type {String}
   * @default "undefined"
   */

  /**
   * Side to show tooltip
   *
   * @property tipSide
   * @type {String}
   * @default "left"
   */
  tipSide: 'left',

  /**
   * Class to add to tooltip
   *
   * @property tipClass
   * @type {String}
   * @default ""
   */
  tipClass: '',

  /**
   * The function to call when action is confirmed.
   *
   * @method onConfirm
   * @return {[type]} [description]
   */
  onConfirm() {},

  //click handler, sets button state
  click(evt) {
    if (!this.propagateClick) {
      evt.stopPropagation();
    }

    if (this.isShowingConfirm) {
      this.onConfirm();
      this.set('isShowingConfirm', false);
    } else {
      this.set('isShowingConfirm', true);
    }
  },

  blur() {
    this.set('isShowingConfirm', false);
  },
});
