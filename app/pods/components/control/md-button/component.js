import classic from 'ember-classic-decorator';
import { attributeBindings, classNameBindings, classNames, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('button')
@classNames('md-button btn')
@classNameBindings('responsive:md-btn-responsive')
@attributeBindings('type', 'disabled')
export default class MdButton extends Component {
 type = 'button';
 disabled = null;

 /**
  * Button text
  *
  * @property text
  * @type {String}
  * @default ""
  */
 text = '';

 /**
  * Button icon
  *
  * @property icon
  * @type {String}
  * @default ""
  */
 icon = '';

 /**
  * Tooltip text shown when isShowingConfirm is true
  *
  * @property tooltip
  * @type {String}
  * @default "undefined"
  */

 /**
  * Side to show tooltip
  *
  * @property tipSide
  * @type {String}
  * @default "left"
  */
 tipSide = 'left';

 /**
  * Class to add to tooltip
  *
  * @property tipClass
  * @type {String}
  * @default ""
  */
 tipClass = '';

 /**
 * Render with wrapped text. Defaults to true if text.length is > 12 or
 * contains spaces.
 *
 * @property responsive
 * @type {Boolean}
 * @default "false"
 * @category computed
 * @requires text
 */
 @computed('text')
 get responsive() {
   return this.text.length > 12 || this.text.indexOf(' ') > 0;
 }
}
