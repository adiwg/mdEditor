import Component from '@ember/component';
import { or } from '@ember/object/computed';

export default class SubbarLinkComponent extends Component {
  /**
   * mdEditor Component that renders a button used to navigate to a parent route
   * or perform an action on click.
   *
   * @class md-button-modal
   * @module mdeditor
   * @submodule components-control
   * @constructor
   */

  /**
   * The text to display
   *
   * @property text
   * @type {String}
   * @required
   */

  /**
   * The click text to display
   *
   * @property clickText
   * @type {String}
   * @required
   */

  /**
   * The button icon
   *
   * @property icon
   * @type {String}
   * @required
   */

  /**
   * The button type
   *
   * @property btnType
   * @type {String}
   * @default 'primary'
   */

  /**
   * The click button icon
   *
   * @property clickIcon
   * @type {String}
   * @required
   */

  /**
   * The click button type
   *
   * @property clickType
   * @type {String}
   * @default 'primary'
   */
  btnType = 'primary';

  /**
   * The route to link to.
   *
   * @property route
   * @type {String}
   */

  /**
   * The click action.
   *
   * @property click
   * @type {String}
   */

  @or('clickText', 'text') clickTxt;
  @or('clickType', 'btnType') clickButtonType;
  @or('clickIcon', 'icon') clickButtonIcon;
}
