import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action, set } from '@ember/object';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';

@classic
export default class MdQualityReportComponent extends Component {
  @alias('model.type') reportType;
  @alias('model.evaluationMethod.type') evaluationType;
  @alias('model.evaluationMethod.evaluationMethodType') methodType;

  get isNameRequired() {
    return !this.model?.qualityMeasure?.identifier;
  }

  get qualityMeasureName() {
    const nameArray = this.model?.qualityMeasure?.name;
    return nameArray && nameArray.length > 0 ? nameArray[0] : null;
  }

  set qualityMeasureName(value) {
    const nameArray = this.model?.qualityMeasure?.name;
    if (nameArray && nameArray.length > 0) {
      nameArray[0] = value;
    } else {
      this.model.qualityMeasure.name = [value];
    }
  }

  get evaluationMethodStartDateTime() {
    const dateTimeArray = this.model?.evaluationMethod?.dateTime;
    return dateTimeArray && dateTimeArray.length > 0
      ? dateTimeArray[0]
      : null;
  }

  set evaluationMethodStartDateTime(value) {
    const dateTimeArray = this.model?.evaluationMethod?.dateTime;
    if (dateTimeArray && dateTimeArray.length > 0) {
      dateTimeArray[0] = value;
    } else {
      this.model.evaluationMethod.dateTime = [value];
    }
  }

  get evaluationMethodEndDateTime() {
    const dateTimeArray = this.model?.evaluationMethod?.dateTime;
    return dateTimeArray && dateTimeArray.length > 1
      ? dateTimeArray[1]
      : null;
  }

  set evaluationMethodEndDateTime(value) {
    const dateTimeArray = this.model?.evaluationMethod?.dateTime;
    if (dateTimeArray && dateTimeArray.length > 1) {
      dateTimeArray[1] = value;
    } else {
      this.model.evaluationMethod.dateTime = [null, value];
    }
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    if (model) {
      once(this, function () {
        set(model, 'qualityMeasure', model.qualityMeasure ?? { name: [] });
        set(model, 'evaluationMethod', model.evaluationMethod ?? { dateTime: [] });
        set(model, 'quantitativeResult', model.quantitativeResult ?? []);
        set(model, 'descriptiveResult', model.descriptiveResult ?? []);
        set(model, 'conformanceResult', model.conformanceResult ?? []);
        set(model, 'coverageResult', model.coverageResult ?? []);
      });
    }
  }

  @action
  addEvaluationProcedure() {
    set(this.model.evaluationMethod, 'evaluationProcedure', {});
  }

  @action
  deleteEvaluationProcedure() {
    set(this.model.evaluationMethod, 'evaluationProcedure', undefined);
  }

  @action
  addQualityMeasureIdentifier() {
    set(this.model.qualityMeasure, 'identifier', {});
  }

  @action
  deleteQualityMeasureIdentifier() {
    set(this.model.qualityMeasure, 'identifier', undefined);
  }
}
