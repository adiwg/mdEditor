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
    return Array.apply(0, Array(10))
      .map(function(element, index) {
        return {
          year: index + (moment().year() - 5)
        };
      });
  }),
  label: 'Fiscal Year',
  valuePath: 'year',
  namePath: 'year',
  tooltip: false,
  searchEnabled: false,
  placeholder: 'Select a Fiscal Year.',
  change(){
    let val = this.get('value');

    let start = moment(val, 'YYYY').subtract('year', 1).month('October').startOf('month');
    let end = moment(val, 'YYYY').month('September').endOf('month');

    this.setProperties({
      end: end,
      start: start
    });
  }
});
