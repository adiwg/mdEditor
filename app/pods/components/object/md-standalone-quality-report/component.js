import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action } from '@ember/object';

@classic
export default class MdStandaloneQualityReportComponent extends Component {
  // Passed-in action
  deleteAction = null;

  @action
  addReportReference() {
    this.model.reportReference = {};
  }

  @action
  deleteReportReference() {
    this.model.reportReference = undefined;
  }
}
