import DateTimePicker from '../md-datetime/component';
import {
  isBlank
} from '@ember/utils';
import {
  set
} from '@ember/object';
import moment from 'moment';

export default DateTimePicker.extend({
  layoutName: 'components/input/md-datetime',
  extraFormats: ['MM','M','MMM'],
  actions: {
    updateDate(date) {
      if(isBlank(date)) {
        set(this, 'date', null);

        return;
      }

      set(this, 'date', moment(date).format(this.get('altFormat') || this.get(
        'format')));
    }
  }
});
