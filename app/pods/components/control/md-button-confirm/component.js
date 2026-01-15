import Component from '@ember/component';
import classic from 'ember-classic-decorator';

@classic
export default class MdButtonConfirmComponent extends Component {
  tagName = 'button';
  classNames = ['md-button-confirm'];
  attributeBindings = ['type', 'disabled'];
  type = 'button';
  isShowingConfirm = false;
  propagateClick = false;
  disabled = null;

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
  tipSide = 'left';

  /**
   * Class to add to tooltip
   *
   * @property tipClass
   * @type {String}
   * @default ""
   */
  tipClass = '';

  /**
   * The function to call when action is confirmed.
   *
   * @method onConfirm
   * @return {[type]} [description]
   */
  onConfirm() {}

  //click handler, sets button state
  click(evt) {
    if(!this.propagateClick) {
      evt.stopPropagation();
    }

    if(this.isShowingConfirm) {
      this.onConfirm();
      this.isShowingConfirm = false;
    } else {
      this.isShowingConfirm = true;
    }
  }

  blur() {
    this.isShowingConfirm = false;
  }
}
