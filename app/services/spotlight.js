import Service from '@ember/service';
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

    if (id === el) {
      this.close();
      return;
    }

    if (id && id !== el) {
      const element = document.getElementById(el);
      if (element) {
        element.classList.remove('md-spotlight-target');
      }
    }

    this.show = true;
    this.elementId = id;
    this.onClose = onClose;
    this.scope = scope;

    document.body.classList.add('md-no-liquid');
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.classList.add('md-spotlight-target');
    }
  }

  closeTask = task({ drop: true }, async () => {
    let id = this.elementId;
    let onClose = this.onClose;

    const overlay = document.querySelector('.md-spotlight-overlay');
    if (overlay) {
      overlay.classList.add('fade-out-fast');
    }

    if (onClose) {
      onClose.call(this.scope || this);
    }

    await timeout(250);

    if (isPresent(id)) {
      document.body.classList.remove('md-no-liquid');
      const element = document.getElementById(id);
      if (element) {
        element.classList.remove('md-spotlight-target');
      }
    }

    this.show = false;
    this.elementId = undefined;
    this.onClose = undefined;
    this.scope = undefined;
  });

  close() {
    this.closeTask.perform();
  }
}
