import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { isBlank } from '@ember/utils';
import dayjs from 'dayjs';

export default class MdDatetimeModern extends Component {
  classNames = ['md-datetime', 'md-input-input'];
  classNameBindings = ['label:form-group', 'required'];

  // Props
  date = null;
  format = 'YYYY-MM-DDTHH:mm:ssZ';
  precision = 'DateTime'; // DateTime, Date, Time
  placeholder = 'Select date and time';
  label = null;
  required = false;
  disabled = false;
  showClear = true;
  model = null;
  valuePath = null;

  init() {
    super.init(...arguments);

    // Set up flatpickr options based on precision
    this.flatpickrOptions = this.getFlatpickrOptions();
  }

  @computed('precision', 'format')
  get getFlatpickrOptions() {
    const baseOptions = {
      allowInput: true,
      altInput: true,
      altFormat: this.getDisplayFormat(),
      dateFormat: 'Z', // ISO format for consistency
      enableTime: this.precision !== 'Date',
      noCalendar: this.precision === 'Time',
      time_24hr: true,
      enableSeconds: false,
    };

    return baseOptions;
  }

  @computed('precision')
  get getDisplayFormat() {
    switch (this.precision) {
      case 'Date':
        return 'M j, Y';
      case 'Time':
        return 'H:i';
      default:
        return 'M j, Y H:i';
    }
  }

  @computed('date', 'model', 'valuePath')
  get currentValue() {
    if (this.model && this.valuePath) {
      const value = this.model.get(this.valuePath);
      return value ? dayjs(value).toDate() : null;
    }
    return this.date ? dayjs(this.date).toDate() : null;
  }

  @action
  onDateChange(selectedDates, dateStr) {
    const selectedDate = selectedDates[0];

    if (selectedDate) {
      const formattedDate = dayjs(selectedDate).format(this.format);
      this.updateValue(formattedDate);
    } else {
      this.updateValue(null);
    }
  }

  @action
  clearDate() {
    this.updateValue(null);
  }

  updateValue(value) {
    if (this.model && this.valuePath) {
      this.model.set(this.valuePath, value);
    } else {
      this.set('date', value);
    }

    // Call external change handler if provided
    if (this.onChange) {
      this.onChange(value);
    }
  }
}
