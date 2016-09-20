import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'md-json-viewer',
  /**
   * True to render in modal dialog
   *
   * @type {Boolean}
   */
  modal: true,

  /**
   * Object to render as JSON in viewer
   *
   * @type {Object}
   */
  json: {},

  close() {
    this.set('modal', false);
  },

  setFontSize(el, factor) {
    let currentFontSize = el.css('font-size');
    let currentFontSizeNum = parseFloat(currentFontSize, 10);
    let newFontSize = currentFontSizeNum * factor;

    el.animate({
      'font-size': `${newFontSize}px`
    });
  },

  didInsertElement() {
    Ember.$('.md-viewer-body')
      .JSONView(this.json);
  },

  actions: {
    collapse() {
      this.$('.md-viewer-body')
        .JSONView('collapse');
    },
    expand() {
      this.$('.md-viewer-body')
        .JSONView('expand');
    },
    zoomin() {
      let body = this.$('.md-viewer-body');
      this.setFontSize(body, 1.1);
    },
    zoomout() {
      let body = this.$('.md-viewer-body');
      this.setFontSize(body, 0.9);
    },
    closeModal() {
      this.close();
    }
  }
});
