import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { once } from '@ember/runloop';
import { set, getWithDefault, action, computed } from '@ember/object';

@classic
export default class MdQualityReport extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    if (model) {
      once(this, function () {
        set(
          model,
          'qualityMeasure',
          getWithDefault(model, 'qualityMeasure', { name: [] })
        );
        set(
          model,
          'evaluationMethod',
          getWithDefault(model, 'evaluationMethod', { dateTime: [] })
        );
        set(
          model,
          'quantitativeResult',
          getWithDefault(model, 'quantitativeResult', [])
        );
        set(
          model,
          'descriptiveResult',
          getWithDefault(model, 'descriptiveResult', [])
        );
        set(
          model,
          'conformanceResult',
          getWithDefault(model, 'conformanceResult', [])
        );
        set(
          model,
          'coverageResult',
          getWithDefault(model, 'coverageResult', [])
        );
      });
    }
  }

  @computed('model.qualityMeasure.identifier')
  get isNameRequired() {
    return !this.get('model.qualityMeasure.identifier');
  }

  @computed('model.qualityMeasure.name.[]')
  get qualityMeasureName() {
    const nameArray = this.get('model.qualityMeasure.name');
    return nameArray && nameArray.length > 0 ? nameArray[0] : null;
  }

  set qualityMeasureName(value) {
    const nameArray = this.get('model.qualityMeasure.name');
    if (nameArray && nameArray.length > 0) {
      nameArray[0] = value;
    } else {
      this.set('model.qualityMeasure.name', [value]);
    }
    return value;
  }

  @computed('model.evaluationMethod.dateTime.[]')
  get evaluationMethodStartDateTime() {
    const dateTimeArray = this.get('model.evaluationMethod.dateTime');
    return dateTimeArray && dateTimeArray.length > 0
      ? dateTimeArray[0]
      : null;
  }

  set evaluationMethodStartDateTime(value) {
    const dateTimeArray = this.get('model.evaluationMethod.dateTime');
    if (dateTimeArray && dateTimeArray.length > 0) {
      dateTimeArray[0] = value;
    } else {
      this.set('model.evaluationMethod.dateTime', [value]);
    }
    return value;
  }

  @computed('model.evaluationMethod.dateTime.[]')
  get evaluationMethodEndDateTime() {
    const dateTimeArray = this.get('model.evaluationMethod.dateTime');
    return dateTimeArray && dateTimeArray.length > 1
      ? dateTimeArray[1]
      : null;
  }

  set evaluationMethodEndDateTime(value) {
    const dateTimeArray = this.get('model.evaluationMethod.dateTime');
    if (dateTimeArray && dateTimeArray.length > 1) {
      dateTimeArray[1] = value;
    } else {
      this.set('model.evaluationMethod.dateTime', [null, value]);
    }
    return value;
  }

  @alias('model.type')
  reportType;

  @alias('model.evaluationMethod.type')
  evaluationType;

  @alias('model.evaluationMethod.evaluationMethodType')
  methodType;

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
