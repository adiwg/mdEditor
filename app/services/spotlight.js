import Service from '@ember/service';
import $ from 'jquery';
import { isPresent } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

export default class SpotlightService extends Service {
  @tracked show = false;
  @tracked elementId = undefined;
  @tracked onClose = undefined;
  @tracked scope = undefined;

  setTarget(id, onClose, scope) {
    let el = this.elementId;

    if(id === el) {
      this.close();
      return;
    }

    if(id && id !== el) {
      $('#' + el).removeClass('md-spotlight-target');
    }

    this.show = true;
    this.elementId = id;
    this.onClose = onClose;
    this.scope = scope;

    $('body').addClass('md-no-liquid');
    $('#' + id).addClass('md-spotlight-target');
  }

  closeTask = task(async () => {
    let id = this.elementId;
    let onClose = this.onClose;

    $('.md-spotlight-overlay').addClass('fade-out-fast');

    if(onClose) {
      onClose.call(this.scope || this);
    }

    await timeout(250);

    if(isPresent(id)) {
      $('body').removeClass('md-no-liquid');
      $('#' + id).removeClass('md-spotlight-target');
    }

    this.show = false;
    this.elementId = undefined;
    this.onClose = undefined;
    this.scope = undefined;
  }).drop();

  close() {
    this.closeTask.perform();
  }
}
