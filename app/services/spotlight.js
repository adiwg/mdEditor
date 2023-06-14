import Service from '@ember/service';
import $ from 'jquery';
import { isPresent } from '@ember/utils';
import { setProperties } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default Service.extend({
  show: false,
  elementId: undefined,

  setTarget(id, onClose, scope) {
    let el = this.elementId;

    if (id === el) {
      this.close();

      return;
    }

    if (id && id !== el) {
      $('#' + el).removeClass('md-spotlight-target');
    }

    setProperties(this, {
      show: true,
      elementId: id,
      onClose: onClose,
      scope: scope,
    });

    $('body').addClass('md-no-liquid');
    $('#' + id).addClass('md-spotlight-target');
  },

  closeTask: task(function* () {
    let id = this.elementId;
    let onClose = this.onClose;

    $('.md-spotlight-overlay').addClass('fade-out-fast');

    if (onClose) {
      onClose.call(this.scope || this);
    }

    yield timeout(250);

    if (isPresent(id)) {
      $('body').removeClass('md-no-liquid');
      $('#' + id).removeClass('md-spotlight-target');
    }

    setProperties(this, {
      show: false,
      elementId: undefined,
      onClose: undefined,
      scope: undefined,
    });
  }).drop(),

  close() {
    this.closeTask.perform();
  },
});
