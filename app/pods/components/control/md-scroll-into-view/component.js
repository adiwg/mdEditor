import Component from '@ember/component';
import scrollIntoView from 'scroll-into-view-if-needed';
// import InViewportMixin from 'ember-in-viewport';

export default Component.extend({
  classNames: ['md-scroll-into-view'],
  didInsertElement() {
    this._super(...arguments);

    let el = document.getElementById(this.elementId);
    let boundary = document
      .querySelector(`#${this.elementId}`)
      .closest(`.md-scroll-into-view:not(#${this.elementId})`);

    scrollIntoView(el, {
      block: boundary ? 'center' : 'nearest',
      behavior: 'smooth',
      //boundary: boundary
    });
  },
});
