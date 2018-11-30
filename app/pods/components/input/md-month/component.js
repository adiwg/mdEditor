import DateTimePicker from '../md-datetime/component';
import {
  isBlank
} from '@ember/utils';
import {
  set,
  computed
} from '@ember/object';
import moment from 'moment';
import {
  once
} from '@ember/runloop';

export default DateTimePicker.extend({
  layoutName: 'components/input/md-datetime',
  extraFormats: computed(function () {
    return ['MM', 'M', 'MMM'];
  }),
  actions: {
    change(date) {
      if(isBlank(date)) {
        set(this, 'date', null);

        return;
      }
      once(this, function () {

        set(this, 'date', moment(date).format(this.get('altFormat') ||
          this.get(
            'format')));
      });
    }
  }
});
