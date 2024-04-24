/**
 * @module mdeditor
 * @submodule components-input
 */

import Toggle from 'ember-toggle/components/x-toggle/component';

export default Toggle.extend({
  /**
   * Custom toggle switch for boolean input
   *
   * @class md-toggle
   * @constructor
   * @extends ember-toggle/components/x-toggle
   */

  /**
   * Bound classes:
   *  - value
   *    - __true__: toggle-on
   *    - __false__: toggle-off
   *
   * @property classNameBindings
   * @type {Array}
   */
  classNameBindings: ['value:toggle-on:toggle-off'],
});
