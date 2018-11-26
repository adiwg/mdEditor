/**
 * @module mdeditor
 * @submodule components-input
 */

import Component from '@ember/component';

export default Component.extend({
  actions: {
    update(value) {
      this.sendAction('updateProfile', value);
    }
  }
});
