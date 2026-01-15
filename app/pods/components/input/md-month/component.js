import DateTimePicker from '../md-datetime/component';
import classic from 'ember-classic-decorator';

@classic
export default class MdMonthComponent extends DateTimePicker {
  layoutName = 'components/input/md-datetime';
  format = 'MMMM';

  get extraFormats() {
    return ['MM', 'M', 'MMM'];
  }

  showClear = false;
  useCurrent = false;
  showTodayButton = false;
}
