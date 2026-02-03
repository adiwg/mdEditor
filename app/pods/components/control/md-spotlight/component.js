import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';
import classic from 'ember-classic-decorator';

const containerClassNames = ['md-spotlight-modal'];
const overlayClassNames = ['md-modal-overlay'];

@classic
export default class MdSpotlightComponent extends ModalDialog {
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
  @service spotlight;

  containerClassNames = containerClassNames;
  overlayClassNames = overlayClassNames;
  overlayClass = 'md-spotlight-overlay fade-in-fast';
  targetAttachment = 'none';
  translucentOverlay = true;
  clickOutsideToClose = true;
  attachment = 'middle center';
  tetherTarget = 'viewport';

  @action
  onClose() {
    this.spotlight.close();
  }

  @action
  onClickOverlay() {
    this.spotlight.close();
  }
}
