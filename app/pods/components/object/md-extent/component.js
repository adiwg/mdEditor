import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
export default class MdExtentComponent extends Component {
  // Passed-in actions
  deleteExtent = null;
  editFeatures = null;
}
