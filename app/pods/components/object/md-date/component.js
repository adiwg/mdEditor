import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { observes } from '@ember-decorators/object';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { validator, buildValidations } from 'ember-cp-validations';
import dayjs from 'dayjs';

const Validations = buildValidations({
  date: validator('presence', {
    presence: true,
    ignoreBlank: true,
  }),
  dateType: validator('presence', {
    presence: true,
    ignoreBlank: true,
  }),
});

@classic
@tagName('')
export default class MdDate extends Component.extend(Validations) {
  init() {
    super.init(...arguments);

    this.set('precisionOptions', [
      { value: 'Year', name: 'Year' },
      { value: 'Month', name: 'Month' },
      { value: 'Day', name: 'Day' },
      { value: 'Time', name: 'Time' },
    ]);

    this.setPrecisionBasedOnDate();
  }

  selectedPrecision = null;

  @alias('model.date')
  date;

  @alias('model.dateType')
  dateType;

  @observes('selectedPrecision')
  selectedPrecisionChanged() {
    const date = this.get('model.date');
    if (!date) return;

    const parsedDate = dayjs(date);
    let newDate;

    switch (this.get('selectedPrecision')) {
      case 'Time':
        newDate = parsedDate.format('YYYY-MM-DD HH:mm:ss');
        break;
      case 'Day':
        newDate = parsedDate.format('YYYY-MM-DD');
        break;
      case 'Month':
        newDate = parsedDate.format('YYYY-MM');
        break;
      case 'Year':
        newDate = parsedDate.format('YYYY');
        break;
      default:
        newDate = parsedDate.format('YYYY-MM-DD HH:mm:ss');
        break;
    }

    if (newDate !== date) {
      this.set('model.date', newDate);
    }
  }

  setPrecisionBasedOnDate() {
    const date = this.get('model.date');
    if (!date) {
      this.set('selectedPrecision', 'Year');
      return;
    }
    if (/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(date)) {
      this.set('selectedPrecision', 'Time');
    } else if (/\d{4}-\d{2}-\d{2}/.test(date)) {
      this.set('selectedPrecision', 'Day');
    } else if (/\d{4}-\d{2}/.test(date)) {
      this.set('selectedPrecision', 'Month');
    } else if (/\d{4}/.test(date)) {
      this.set('selectedPrecision', 'Year');
    } else {
      this.set('selectedPrecision', 'Time');
    }
  }
}
