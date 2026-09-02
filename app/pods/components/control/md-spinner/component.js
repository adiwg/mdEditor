import Component from '@ember/component';
import classic from 'ember-classic-decorator';

/**
 * @property size - The size of the FontAwesome icon (optional)
 * @type {String}
 * @default "false"
 *
 * @property text - The text to show below the spinner (optional)
 * @type {String}
 */
@classic
export default class MdSpinnerComponent extends Component {
  classNames = ['text-center', 'md-spinner'];
}
