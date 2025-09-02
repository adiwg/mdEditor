import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

const containerClassNames = ['md-spotlight-modal'];
const overlayClassNames = ['md-modal-overlay'];

@classic
export default class MdSpotlight extends ModalDialog {
  /**
   * Component that highlights a DOM element
   *
   * @class md-spotlight
   * @module mdeditor
   * @submodule components-control
   * @extends modal-dialog
   * @uses service-spotlight
   * @constructor
   */

  /**
   * The inected spotlight Service
   *
   * @property spotlight
   * @type {Service}
   */
  @service
  spotlight;

  containerClassNames = containerClassNames;
  overlayClassNames = overlayClassNames;
  overlayClass = 'md-spotlight-overlay fade-in-fast';
  targetAttachment = 'none';
  translucentOverlay = true;
  clickOutsideToClose = false;
  attachment = 'middle center';
  tetherTarget = 'viewport';

  @action
  onClose() {
    // TODO: This call to super is within an action, and has to refer to the parent
    // class's actions to be safe. This should be refactored to call a normal method
    // on the parent class. If the parent class has not been converted to native
    // classes, it may need to be refactored as well. See
    // https://github.com/scalvert/ember-native-class-codemod/blob/master/README.md
    // for more details.
    super.actions.onClose.call(this, ...arguments);
    this.spotlight.close();
  }

  @action
  onClickOverlay() {
    // TODO: This call to super is within an action, and has to refer to the parent
    // class's actions to be safe. This should be refactored to call a normal method
    // on the parent class. If the parent class has not been converted to native
    // classes, it may need to be refactored as well. See
    // https://github.com/scalvert/ember-native-class-codemod/blob/master/README.md
    // for more details.
    super.actions.onClickOverlay.call(this, ...arguments);
    this.spotlight.close();
  }
}
