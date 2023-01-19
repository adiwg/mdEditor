import DateTimePicker from '../md-datetime/component';
import { computed } from '@ember/object';

export default DateTimePicker.extend({
  layoutName: 'components/input/md-datetime',
  format: 'MMMM',
  extraFormats: computed(function () {
    return ['MM', 'M', 'MMM'];
  }),
  showClear: false,
  useCurrent: false,
  showTodayButton:false
});
