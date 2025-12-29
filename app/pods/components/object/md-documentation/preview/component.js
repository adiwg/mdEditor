import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNameBindings('muted:text-muted')
export default class Preview extends Component {
 /**
  * Whether to render the text muted.
  *
  * @property muted
  * @type {Boolean}
  * @default "true"
  */
 muted = true;
}
