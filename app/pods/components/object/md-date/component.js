import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { validator, buildValidations } from 'ember-cp-validations';
import { observer } from '@ember/object';
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
export default class MdDateComponent extends Component.extend(Validations) {
  tagName = '';
  selectedPrecision = null;

  @alias('model.date') date;
  @alias('model.dateType') dateType;

  selectedPrecisionChanged = observer('selectedPrecision', function () {
    const date = this.model?.date;
    if (!date) return;

    const parsedDate = dayjs(date);
    let newDate;

    switch (this.selectedPrecision) {
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
      this.model.date = newDate;
    }
  });

  setPrecisionBasedOnDate() {
    const date = this.model?.date;
    if (!date) {
      this.selectedPrecision = 'Year';
      return;
    }
    if (/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(date)) {
      this.selectedPrecision = 'Time';
    } else if (/\d{4}-\d{2}-\d{2}/.test(date)) {
      this.selectedPrecision = 'Day';
    } else if (/\d{4}-\d{2}/.test(date)) {
      this.selectedPrecision = 'Month';
    } else if (/\d{4}/.test(date)) {
      this.selectedPrecision = 'Year';
    } else {
      this.selectedPrecision = 'Time';
    }
  }

  init() {
    super.init(...arguments);

    this.precisionOptions = [
      { value: 'Year', name: 'Year' },
      { value: 'Month', name: 'Month' },
      { value: 'Day', name: 'Day' },
      { value: 'Time', name: 'Time' },
    ];

    this.setPrecisionBasedOnDate();
  }
}
