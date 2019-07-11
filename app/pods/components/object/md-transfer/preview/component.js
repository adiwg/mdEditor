import Component from '@ember/component';

export default Component.extend({
  init() {
    this.tagName = this.isTable ? '' : 'div';
    this._super(...arguments);
  },

  classNames: ['property'],
  isTable: true
});
