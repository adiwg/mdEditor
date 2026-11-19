import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action, set } from '@ember/object';

@classic
export default class MdStandaloneQualityReportComponent extends Component {
  // Passed-in action
  deleteAction = null;

  @action
  addReportReference() {
    set(this.model, 'reportReference', {});
  }

  @action
  deleteReportReference() {
    set(this.model, 'reportReference', undefined);
  }
}
