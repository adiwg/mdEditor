import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('')
export default class MdDefinition extends Component {
 /**
  * The definition title
  *
  * @property title
  * @type {String}
  */

 /**
  * The class(es) to apply to the definition title
  *
  * @property titleClass
  * @type {String}
  */

 /**
  * The definition text
  *
  * @property text
  * @type {String}
  * @required
  */

 /**
  * The text to display if the text is falsy.
  *
  * @property empty
  * @type {String}
  * @default  'Not Defined'
  */
 empty = 'Not Defined';
}
