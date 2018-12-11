import Service from '@ember/service';
import $ from 'jquery';
import { isPresent } from '@ember/utils';
import { setProperties } from '@ember/object';

export default Service.extend({
  show: false,
  elementId: undefined,

  setTarget(id, onClose, scope) {
    let el = this.elementId;

    if(id === el) {
      this.close();

      return;
    }

    if(id && id !== el) {
      $('#' + el).removeClass('md-spotlight-target');
    }

    setProperties(this, {
      show: true,
      elementId: id,
      onClose: onClose,
      scope: scope
    });

    $('body').addClass('md-no-liquid');
    $('#' + id).addClass('md-spotlight-target');
  },

  close() {
    let id = this.elementId;
    let onClose = this.onClose;

    if(isPresent(id)) {
      $('body').removeClass('md-no-liquid');
      $('#' + id).removeClass('md-spotlight-target');
    }

    if(onClose) {
      onClose.call(this.scope || this);
    }

    setProperties(this, {
      show: false,
      elementId: undefined,
      onClose: undefined,
      scope: undefined
    });
  }
});
