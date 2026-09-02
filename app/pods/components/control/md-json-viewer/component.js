import $ from 'jquery';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { typeOf } from '@ember/utils';

@classic
export default class MdJsonViewerComponent extends Component {
  /**
   * JSON viewer
   *
   * @class md-json-viewer
   * @module mdeditor
   * @submodule components-control
   */

  classNames = ['md-json-viewer'];

  /**
   * True to render in modal dialog
   *
   * @property modal
   * @type {Boolean}
   */
  modal = true;

  /**
   * Element selector or element that serves as the reference for modal position
   *
   * @property target
   * @type {String}
   */
  target = 'html';

  /**
   * Object or string to render as JSON in viewer
   *
   * @property json
   * @type {Object|String}
   */
  json = 'No json supplied';

  close() {
    this.modal = false;
  }

  setFontSize(el, factor) {
    let currentFontSize = window.getComputedStyle(el).fontSize;
    let currentFontSizeNum = parseFloat(currentFontSize, 10);
    let newFontSize = currentFontSizeNum * factor;

    el.style.fontSize = `${newFontSize}px`;
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    let json = this.json;
    let out = typeOf(json) === 'string' ? json : JSON.stringify(json);

    const viewerBody = document.querySelector('.md-viewer-body');
    if (viewerBody) {
      $(viewerBody).JSONView(out);
    }
  }

  @action
  collapse() {
    const viewerBody = this.element.querySelector('.md-viewer-body');
    if (viewerBody) {
      $(viewerBody).JSONView('collapse');
    }
  }

  @action
  expand() {
    const viewerBody = this.element.querySelector('.md-viewer-body');
    if (viewerBody) {
      $(viewerBody).JSONView('expand');
    }
  }

  @action
  zoomin() {
    const body = this.element.querySelector('.md-viewer-body');
    if (body) {
      this.setFontSize(body, 1.1);
    }
  }

  @action
  zoomout() {
    const body = this.element.querySelector('.md-viewer-body');
    if (body) {
      this.setFontSize(body, 0.9);
    }
  }

  @action
  closeModal() {
    this.close();
  }
}
