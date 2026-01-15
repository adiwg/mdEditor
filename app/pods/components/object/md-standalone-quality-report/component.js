import Component from '@ember/component';
import { action } from '@ember/object';

export default class MdStandaloneQualityReportComponent extends Component {
  @action
  deleteStandaloneQualityReport() {
    this.deleteStandaloneQualityReport();
  }

  @action
  addReportReference() {
    this.model.reportReference = {};
  }

  @action
  deleteReportReference() {
    this.model.reportReference = undefined;
  }
}
