// Use global jQuery since we need it for jquery-jsonview
/* global $ */
import Component from '@ember/component';
import { typeOf } from '@ember/utils';

export default Component.extend({
  /**
   * JSON viewer
   *
   * @class md-json-viewer
   * @module mdeditor
   * @submodule components-control
   */

  classNames: 'md-json-viewer',

  /**
   * True to render in modal dialog
   *
   * @property modal
   * @type {Boolean}
   */
  modal: true,

  /**
   * Element selector or element that serves as the reference for modal position
   *
   * @property target
   * @type {String}
   */
  target: 'html',

  /**
   * Object or string to render as JSON in viewer
   *
   * @property json
   * @type {Object|String}
   */
  json: 'No json supplied',

  close() {
    this.set('modal', false);
  },

  setFontSize(element, factor) {
    const $el = $(element);
    let currentFontSize = $el.css('font-size');
    let currentFontSizeNum = parseFloat(currentFontSize, 10);
    let newFontSize = currentFontSizeNum * factor;

    $el.animate({
      'font-size': `${newFontSize}px`,
    });
  },

  didInsertElement() {
    let json = this.json;
    let out = typeOf(json) === 'string' ? json : JSON.stringify(json);

    // Use jQuery wrapper for jsonview library compatibility
    const viewerBody = this.element.querySelector('.md-viewer-body');
    if (viewerBody) {
      $(viewerBody).JSONView(out);
    }
  },

  actions: {
    collapse() {
      const viewerBody = this.element.querySelector('.md-viewer-body');
      if (viewerBody) {
        $(viewerBody).JSONView('collapse');
      }
    },
    expand() {
      const viewerBody = this.element.querySelector('.md-viewer-body');
      if (viewerBody) {
        $(viewerBody).JSONView('expand');
      }
    },
    zoomin() {
      const viewerBody = this.element.querySelector('.md-viewer-body');
      if (viewerBody) {
        this.setFontSize(viewerBody, 1.1);
      }
    },
    zoomout() {
      const viewerBody = this.element.querySelector('.md-viewer-body');
      if (viewerBody) {
        this.setFontSize(viewerBody, 0.9);
      }
    },
    closeModal() {
      this.close();
    },
  },
});
