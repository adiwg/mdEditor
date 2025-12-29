import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import DateTimePicker from '../md-datetime/component';

@classic
export default class MdMonth extends DateTimePicker {
  layoutName = 'components/input/md-datetime';
  format = 'MMMM';

  @computed
  get extraFormats() {
    return ['MM', 'M', 'MMM'];
  }

  showClear = false;
  useCurrent = false;
  showTodayButton = false;
}
