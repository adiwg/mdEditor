import Service from '@ember/service';
import { isPresent } from '@ember/utils';
import { setProperties } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default class SpotlightService extends Service {
  show = false;
  elementId;

  setTarget(id, onClose, scope) {
    let el = this.elementId;

    if (id === el) {
      this.close();

      return;
    }

    if (id && id !== el) {
      const prevElement = document.getElementById(el);
      if (prevElement) {
        prevElement.classList.remove('md-spotlight-target');
      }
    }

    setProperties(this, {
      show: true,
      elementId: id,
      onClose: onClose,
      scope: scope,
    });

    document.body.classList.add('md-no-liquid');
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.classList.add('md-spotlight-target');
    }
  }

  closeTask = task({ drop: true }, async () => {
    let id = this.elementId;
    let onClose = this.onClose;

    const overlayElements = document.querySelectorAll('.md-spotlight-overlay');
    overlayElements.forEach((el) => el.classList.add('fade-out-fast'));

    if (onClose) {
      onClose.call(this.scope || this);
    }

    await timeout(250);

    if (isPresent(id)) {
      document.body.classList.remove('md-no-liquid');
      const targetElement = document.getElementById(id);
      if (targetElement) {
        targetElement.classList.remove('md-spotlight-target');
      }
    }

    setProperties(this, {
      show: false,
      elementId: undefined,
      onClose: undefined,
      scope: undefined,
    });
  });

  close() {
    this.closeTask.perform();
  }
}
