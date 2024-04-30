import Component from '@ember/component';
import { set } from '@ember/object';

export default Component.extend({
  actions: {
    deleteQualityEvaluationReportInformation() {
      this.deleteQualityEvaluationReportInformation();
    },
    addReportReference() {
      set(this.model, 'reportReference', {});
    },
    deleteReportReference() {
      set(this.model, 'reportReference', undefined);
    },
  },
});
