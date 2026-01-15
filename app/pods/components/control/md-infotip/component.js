import Component from '@ember/component';
import classic from 'ember-classic-decorator';

/**
 * Tooltip displayed as icon with font styled as superscript.
 *
 * @class md-infotip
 * @module mdeditor
 * @submodule components-control
 * @constructor
 */
@classic
export default class MdInfotipComponent extends Component {
  tagName = 'sup';
  classNames = ['md-infotip'];

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
  icon = 'info-circle';

  /**
  * Tooltip delay
  *
  * @property tip
  * @type {Number}
  * @default 350
  */
  delay = 350;
}
