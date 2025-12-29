import classic from 'ember-classic-decorator';
import { classNames, tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('sup')
@classNames('md-infotip')
export default class MdInfotip extends Component {
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
