import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['md-row-body'],
  spotlight: service(),

  didInsertElement() {
    this._super(...arguments);

    this.spotlight.setTarget(this.elementId, this.collapse, this);
    this.element.classList.add('fade-in-fast');
  },

  willDestroyElement() {
    this._super(...arguments);

    this.spotlight.close();
  },
  collapse() {
    this.element.classList.add('fade-out-fast');
    this.collapseRow(this.index, this.record);
  },
});
