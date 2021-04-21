import Component from '@ember/component';

export default Component.extend({
  /**
  * Tooltip displayed as icon with font styled as superscript.
  *
  * @class md-infotip
  * @module mdeditor
  * @submodule components-control
  * @constructor
  */

  tagName: 'sup',
  classNames: ['md-infotip'],

  /**
  * Tooltip text
  *
  * @property text
  * @type {String}
  * @required
  */

  /**
  * Tooltip text
  *
  * @property tip
  * @type {String}
  * @default 'info-circle'
  */
  icon: 'info-circle',

  /**
  * Tooltip delay
  *
  * @property tip
  * @type {Number}
  * @default 350
  */
  delay: 350,

});
