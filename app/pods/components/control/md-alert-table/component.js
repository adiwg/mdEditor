import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['alert', 'md-alert-table'],
  classNameBindings: ['alertType'],
  required: false,
  title: '',
  target: null,

  alertType: computed('required', function () {
    return 'alert-' + (this.required ? 'danger' : 'info');
  }),
  tipType: computed('required', function () {
    return this.required ? 'danger' : 'info';
  }),
  tipIcon: computed('required', function () {
    return this.required ? 'circle-exclamation' : 'circle-info';
  }),
  actions: {
    addItem(target) {
      this.addItem(target);
    },
  },
});
