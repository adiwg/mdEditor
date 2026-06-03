import { computed } from '@ember/object';
import Select from 'mdeditor/pods/components/input/md-select/component';
import layout from 'mdeditor/pods/components/input/md-select/template';
import moment from 'moment';
import { inject as service } from '@ember/service';
import { not } from '@ember/object/computed';

export default Select.extend({
  layout,
  settings: service('settings'),
  classNames: ['md-fiscalyear'],
  label: 'Pick Fiscal Year',
  placeholder: 'Pick a Fiscal Year',
  objectArray: computed(function () {
    return Array.apply(0, Array(12)).map(function (element, index) {
      return {
        year: index + (moment().year() - 10),
      };
    });
  }),
  valuePath: 'year',
  namePath: 'year',
  tooltip: false,
  searchEnabled: true,
  create: true,
  disabled: computed('settings.data.fiscalStartMonth', function () {
    return not(this.get('settings.data.fiscalStartMonth'));
  }),
  change() {
    const val = this.value;
    const month = parseInt(this.get('settings.data.fiscalStartMonth'), 10) - 1;
    const dt =
      month <= 6
        ? moment(val, 'YYYY')
        : moment(val, 'YYYY').subtract(1, 'year');
    const start = dt.month(month).startOf('month');
    const end = start.clone().add(11, 'months').endOf('month');
    const context = this.context;

    if (context) {
      context.set('start', start.toISOString());
      context.set('end', end.toISOString());
    }

    this.set('value', null);
  },
});
