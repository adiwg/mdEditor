import Component from '@ember/component';
import classic from 'ember-classic-decorator';

@classic
export default class MdDefinitionComponent extends Component {
  /**
   * mdEditor Component that renders a definition
   *
   * @class md-definition
   * @module mdeditor
   * @submodule components-control
   * @constructor
   */

  tagName = '';

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
