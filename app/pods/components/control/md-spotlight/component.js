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
  // The spotlighted content isn't actually rendered inside this dialog's
  // own container -- it's the original target element, kept in place and
  // z-index-elevated above the overlay (see .md-spotlight-target in
  // _modal.scss). ember-modal-dialog's clickOutsideToClose only checks
  // whether a click landed inside its own container, so with it enabled
  // every click on the spotlighted form was treated as "outside" and
  // immediately closed the spotlight. Clicking the dimmed overlay itself
  // still closes it via onClickOverlay below, independently of this flag.
  clickOutsideToClose = false;
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
