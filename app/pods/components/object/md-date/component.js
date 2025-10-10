import { alias } from '@ember/object/computed';
import Component from '@ember/component';
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

export default Component.extend(Validations, {
  init() {
    this._super(...arguments);

    this.set('precisionOptions', [
      { value: 'Year', name: 'Year' },
      { value: 'Month', name: 'Month' },
      { value: 'Day', name: 'Day' },
      { value: 'Time', name: 'Time' },
    ]);

    this.setPrecisionBasedOnDate();
  },

  selectedPrecision: null,
  selectedFormat: 'YYYY-MM-DDTHH:mm:ssZ',

  tagName: '',
  date: alias('model.date'),
  dateType: alias('model.dateType'),

  selectedPrecisionChanged: observer('selectedPrecision', function () {
    const dateObj = this.get('model.date');
    let newDate;

    switch (this.selectedPrecision) {
      case 'Year':
        this.set('selectedFormat', 'YYYY');
        if (dateObj) newDate = dayjs(dateObj).format('YYYY');
        break;
      case 'Month':
        this.set('selectedFormat', 'YYYY-MM');
        if (dateObj) newDate = dayjs(dateObj).format('YYYY-MM');
        break;
      case 'Day':
        this.set('selectedFormat', 'YYYY-MM-DD');
        if (dateObj) newDate = dayjs(dateObj).format('YYYY-MM-DD');
        break;
      case 'Time':
      default:
        this.set('selectedFormat', 'YYYY-MM-DDTHH:mm:ssZ');
        if (dateObj) newDate = dayjs(dateObj).format('YYYY-MM-DDTHH:mm:ssZ');
        break;
    }

    if (newDate !== dateObj) {
      this.set('model.date', newDate);
    }
  }),

  setPrecisionBasedOnDate() {
    const date = this.get('model.date');
    if (!date) {
      this.set('selectedPrecision', 'Year');
      return;
    }
    if (/^\d{4}$/.test(date)) {
      this.set('selectedPrecision', 'Year');
      this.set('selectedFormat', 'YYYY');
    } else if (/^\d{4}-\d{2}$/.test(date)) {
      this.set('selectedPrecision', 'Month');
      this.set('selectedFormat', 'YYYY-MM');
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      this.set('selectedPrecision', 'Day');
      this.set('selectedFormat', 'YYYY-MM-DD');
    } else {
      this.set('selectedPrecision', 'Time');
      this.set('selectedFormat', 'YYYY-MM-DDTHH:mm:ssZ');
    }
  },
});
