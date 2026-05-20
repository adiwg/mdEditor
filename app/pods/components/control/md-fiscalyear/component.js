import { computed } from '@ember/object';
import Select from 'mdeditor/pods/components/input/md-select/component';
import layout from 'mdeditor/pods/components/input/md-select/template';
import moment from 'moment';
import {
  inject as service
} from '@ember/service';

export default Select.extend({
  layout,
  settings: service('settings'),
  classNames: ['md-fiscalyear'],
  init() {
    this._super(...arguments);
    this.set('label', 'Pick Fiscal Year');
    this.set('placeholder', 'Pick a Fiscal Year');
  },
  objectArray: computed(function () {
    return Array.apply(0, Array(12)).map(function (element, index) {
      return {
        year: index + (moment().year() - 10)
      };
    });
  }),
  label: 'Pick Fiscal Year',
  valuePath: 'year',
  namePath: 'year',
  tooltip: false,
  searchEnabled: true,
  placeholder: 'Pick a Fiscal Year',
  create: true,
  disabled: computed('settings.data.fiscalStartMonth', function() {
    return !this.get('settings.data.fiscalStartMonth');
  }),
  change() {
    let val = this.value;
    let month = parseInt(this.get(
      'settings.data.fiscalStartMonth'), 10) - 1;
    let dt = month <= 6 ? moment(val, 'YYYY') : moment(val, 'YYYY').subtract(1, 'year');
    let start = dt.month(month).startOf('month');
    let end = start.clone().add(11, 'months').endOf('month');
    let context = this.context;

    if (context) {
      context.set('start', start.toISOString());
      context.set('end', end.toISOString());
    }

    this.set('value', null);
  }
});
