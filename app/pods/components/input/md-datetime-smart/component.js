import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class MdDatetimeSmart extends Component {
  @service datePicker;

  // Forward all attributes to the appropriate implementation
  classNames = ['md-datetime-wrapper'];
}
