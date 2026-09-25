import { computed } from '@ember/object';
import { not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import classic from 'ember-classic-decorator';
import Select from 'mdeditor/pods/components/input/md-select/component';
import layout from 'mdeditor/pods/components/input/md-select/template';
import moment from 'moment';

/**
 * Fiscal year picker built on md-select.
 *
 * @class md-fiscalyear
 * @extends md-select
 */
@classic
class MdFiscalyearComponent extends Select {
  layout = layout;

  label = 'Pick Fiscal Year';

  placeholder = 'Pick a Fiscal Year';

  valuePath = 'year';

  namePath = 'year';

  tooltip = false;

  searchEnabled = true;

  create = true;

  change() {
    const val = this.value;
    const month = parseInt(this.settings.data?.fiscalStartMonth, 10) - 1;
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
  }
}

MdFiscalyearComponent.reopen({
  settings: service('settings'),

  objectArray: computed(function () {
    return Array.apply(0, Array(12)).map(function (element, index) {
      return {
        year: index + (moment().year() - 10),
      };
    });
  }),

  disabled: not('settings.data.fiscalStartMonth'),
});

MdFiscalyearComponent.prototype.classNames = [
  ...Select.prototype.classNames,
  'md-fiscalyear',
];

export default MdFiscalyearComponent;
