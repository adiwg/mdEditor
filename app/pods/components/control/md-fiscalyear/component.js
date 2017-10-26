import Ember from 'ember';
import Select from 'mdeditor/pods/components/input/md-select/component';
import layout from 'mdeditor/pods/components/input/md-select/template';
import moment from 'moment';

const {
  computed
} = Ember;

export default Select.extend({
  layout,
  objectArray: computed(function() {
    return Array.apply(0, Array(12)).map(function(element, index) {
      return {
        year: index + (moment().year() - 10)
      };
    });
  }),
  label: 'Fiscal Year',
  valuePath: 'year',
  namePath: 'year',
  tooltip: false,
  searchEnabled: true,
  placeholder: 'Select a Fiscal Year.',
  create: true,
  change() {
    let val = this.get('value');
    let start = moment(val, 'YYYY').subtract(1, 'year').month('October').startOf(
      'month');
    let end = moment(val, 'YYYY').month('September').endOf('month');
    let context = this.get('context');

    this.setProperties({
      end: end,
      start: start
    });

    //have to set values using datetimepicker
    context.$('.start .date')
      .data("DateTimePicker")
      .date(start);
    context.$('.end .date')
      .data("DateTimePicker")
      .date(end);
  }
});
