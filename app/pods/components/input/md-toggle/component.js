/**
 * @module mdeditor
 * @submodule components-input
 */

import Toggle from 'ember-toggle/components/x-toggle/component';
import classic from 'ember-classic-decorator';

/**
 * Custom toggle switch for boolean input
 *
 * @class md-toggle
 * @constructor
 * @extends ember-toggle/components/x-toggle
 *
 * Bound classes:
 *  - value
 *    - __true__: toggle-on
 *    - __false__: toggle-off
 */
@classic
export default class MdToggleComponent extends Toggle {
  classNameBindings = ['value:toggle-on:toggle-off'];
}
