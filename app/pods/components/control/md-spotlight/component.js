import { inject as service } from '@ember/service';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

const containerClassNames = ['md-spotlight-modal'];
const overlayClassNames = ['md-modal-overlay'];

export default ModalDialog.extend({
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
  spotlight: service(),

  containerClassNames: containerClassNames,
  overlayClassNames: overlayClassNames,
  overlayClass: 'md-spotlight-overlay fade-in-fast',
  targetAttachment: 'none',
  translucentOverlay: true,
  clickOutsideToClose: false,
  attachment: 'middle center',
  tetherTarget: 'viewport',

  // /**
  // * The id of the DOM element to spotlight. Uses the spotlight service "elementId"
  // * by default.
  // *
  // * @property spotlightTargetId
  // * @type {String}
  // * @default "computed.alias('spotlight.elementId')"
  // * @category computed
  // * @requires spotlight.elementId
  // * @required
  // */
  // spotlightTargetId: computed.alias('spotlight.elementId'),

  // willInsertElement() {
  //   $('.md-modal-overlay').click();
  // },
  // didInsertElement() {
  //   this._super(...arguments);
  //
  //   let id = this.get('spotlightTargetId');
  //
  //   if(isPresent(id)) {
  //     $('body').addClass('md-no-liquid');
  //     $('#' + id).addClass('md-spotlight-target');
  //   }
  //
  // },

  actions: {
    onClose() {
      this._super(...arguments);
      this.spotlight.close();
    },

    onClickOverlay() {
      this._super(...arguments);
      this.spotlight.close();
    }
  }
});
