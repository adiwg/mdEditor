/**
 * @module mdeditor
 * @submodule components-input
 */

import Component from '@ember/component';
import { and } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: ['label:form-group', 'required'],
  attributeBindings: ['data-spy'],

  /**
   * Input, edit, display a boolean value
   *
   * @class md-boolean
   * @constructor
   */

  /**
   * Value of the input.
   * The edited value is returned
   *
   * @property value
   * @type Boolean
   * @default false
   */
  value: false,

  /**
   * Text to display next to the checkbox
   *
   * @property text
   * @type String
   */

  /**
   * The form label to display
   *
   * @property label
   * @type String
   * @default null
   */
  label: null,

  /**
   * Text displayed in empty inputs
   *
   * @property showInfoText
   * @type String
   * @default null
   */
  showInfoText: null,

  /**
   * Whether to show the infotip
   *
   * @property infotip
   * @type Boolean
   * @default false
   */
  infotip: false,

  /**
   * Determines whether infotip is rendered
   *
   * @property showInfotip
   * @type {Boolean}
   * @default "false"
   * @readOnly
   * @category computed
   * @requires showInfoText,infotip
   */
  showInfotip: and('showInfoText', 'infotip'),
});
