import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);

    this.tagName = this.isTable ? 'td' : 'div';
  },

  classNames: ['property']
});
