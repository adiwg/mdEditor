/**
 * @module mdeditor
 * @submodule components-input
 */

import { once } from '@ember/runloop';

import { computed } from '@ember/object';
import Input from '../md-input/component';

export default Input.extend({
  /**
   * Input, edit, display a single item
   *
   * @class md-input-confirm
   * @extends md-input
   * @constructor
   */

  classNameBindings: ['required'],

  disabled: true,

  isDisabled: computed('disabled', function(){
    return this.disabled;
  }),

  didInsertElement() {
    this._super(...arguments);
    this.$('input')
      .on('blur', () => {
        this.set('disabled', true);
      });
  },

  actions: {
    allowEdit() {
      this.set('disabled', false);
      once(() => {
        this.$('input').focus();
      });
    }
  }
});
