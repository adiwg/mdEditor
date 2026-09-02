import DateTimePicker from '../md-datetime/component';
import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';

@classic
export default class MdMonthComponent extends DateTimePicker {
  layoutName = 'components/input/md-datetime';
  format = 'MMMM';

  showClear = false;
}

MdMonthComponent.reopen({
  extraFormats: computed(function () {
    return ['MM', 'M', 'MMM'];
  }),
});
