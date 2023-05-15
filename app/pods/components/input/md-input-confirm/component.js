/**
 * @module mdeditor
 * @submodule components-input
 */

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

  isDisabled: computed.reads('disabled'),

  actions: {
    allowEdit() {
      this.set('disabled', false);
      this.element.querySelector('input').focus();
    },
    inputBlur(){
      this.set('disabled', true);
    }
  }
});
