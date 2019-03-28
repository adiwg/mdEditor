import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['md-row-body'],
  spotlight: service(),

  didInsertElement() {
    this._super(...arguments);

    this.spotlight.setTarget(this.elementId);
    this.spotlight.setTarget("ember-view");
  },

  willDestroyElement() {
    this._super(...arguments);

    this.spotlight.close();
  },
});
