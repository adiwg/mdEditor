import Ember from 'ember';
import ModalDialog from 'ember-modal-dialog/components/tether-dialog';

const {
  $,
  isPresent
} = Ember;

export default ModalDialog.extend({
  containerClassNames: ['md-spotlight-modal'],
  overlayClassNames: ['md-modal-overlay'],
  targetAttachment: 'none',
  //spotlightTargetId: null,
  translucentOverlay: true,
  clickOutsideToClose: false,

  willInsertElement() {
    $('.md-modal-overlay').click();
  },
  didInsertElement() {
    this._super(...arguments);

    let id = this.get('spotlightTargetId');

    if(isPresent(id)) {
      $('body').addClass('md-no-liquid');
      $('#' + id).addClass('md-spotlight-target');
    }

  },
  actions: {
    close() {
      console.info(this);

      let id = this.get('spotlightTargetId');

      if(isPresent(id)) {
        $('body').removeClass('md-no-liquid');
        $('#' + id).removeClass('md-spotlight-target');
      }

      this.get('onClose')();
      this._super(...arguments);
    }
  }
});
