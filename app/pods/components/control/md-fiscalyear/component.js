import classic from 'ember-classic-decorator';
import { classNames, layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Select from 'mdeditor/pods/components/input/md-select/component';
import layout from 'mdeditor/pods/components/input/md-select/template';
import moment from 'moment';

@classic
@templateLayout(layout)
@classNames('md-fiscalyear')
export default class MdFiscalyear extends Select {
  @service('settings')
  settings;

  @computed
  get objectArray() {
    return Array.apply(0, Array(12)).map(function (element, index) {
      return {
        year: index + (moment().year() - 10)
      };
    });
  }

  label = 'Pick Fiscal Year';
  valuePath = 'year';
  namePath = 'year';
  tooltip = false;
  searchEnabled = true;
  placeholder = 'Pick a Fiscal Year';
  create = true;

  @computed('settings.data.fiscalStartMonth')
  get disabled() {
    return !this.get('settings.data.fiscalStartMonth');
  }

  change() {
    let val = this.value;
    let month = parseInt(this.get(
      'settings.data.fiscalStartMonth'), 10) - 1;
    let dt = month <= 6 ? moment(val, 'YYYY') : moment(val, 'YYYY').subtract(1, 'year');
    let start = dt.month(month).startOf('month');
    //let end = moment(val, 'YYYY').month('September').endOf('month');
    let end = start.clone().add(11, 'months').endOf('month');
    let context = this.context;

    this.setProperties({
      end: end,
      start: start
    });

    if(context) {
      //have to set values using datetimepicker
      context.$('.start .date')
        .data("DateTimePicker")
        .date(start);
      context.$('.end .date')
        .data("DateTimePicker")
        .date(end);
    }

    this.set('value', null);
  }
}
