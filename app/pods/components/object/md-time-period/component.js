import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { get, set } from '@ember/object';
import { once, scheduleOnce } from '@ember/runloop';
import { validator, buildValidations } from 'ember-cp-validations';

const timeUnit = [{
    name: 'year',
    value: 'year'
  },
  {
    name: 'month',
    value: 'month'
  },
  {
    name: 'day',
    value: 'day'
  },
  {
    name: 'hour',
    value: 'hour'
  },
  {
    name: 'minute',
    value: 'minute'
  },
  {
    name: 'second',
    value: 'second'
  }
];

const durationUnit = [
  'years',
  'months',
  'days',
  'hours',
  'minutes',
  'seconds'
];

const Validations = buildValidations({
  'intervalAmount': [
    validator('presence', {
      presence: true,
      //disabled: computed.notEmpty('model.endDateTime'),
      ignoreBlank: true
    })
  ],
  'startDateTime': [
    validator('presence', {
      presence: true,
      disabled: alias('model.endDateTime').readOnly(),
      ignoreBlank: true
    })
  ],
  'endDateTime': [
    validator('date', {
      onOrAfter: alias('model.startDateTime'),
      isWarning: true
    }),
    validator('presence', {
      presence: true,
      disabled: alias('model.startDateTime').readOnly(),
      ignoreBlank: true
    })
  ]
});

@classic
export default class MdTimePeriodComponent extends Component.extend(Validations) {
  constructor() {
    super(...arguments);

    this.timeUnit = timeUnit;
    this.durationUnit = durationUnit;
  }

  tagName = 'form';

  /**
   * The profile path for the component
   *
   * @property profilePath
   * @type {String}
   */

  get startDateTime() {
    return get(this, 'model.startDateTime');
  }

  set startDateTime(value) {
    once(this, function () {
      set(this, 'model.startDateTime', value);
    });
  }

  get endDateTime() {
    return get(this, 'model.endDateTime');
  }

  set endDateTime(value) {
    once(this, function () {
      set(this, 'model.endDateTime', value);
    });
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    scheduleOnce('afterRender', this, '_initModelDefaults');
  }

  _initModelDefaults() {
    let model = this.model;
    if (!model) { return; }
    if (model.periodName == null) { set(model, 'periodName', []); }
    if (model.timeInterval == null) { set(model, 'timeInterval', {}); }
    if (model.duration == null) { set(model, 'duration', {}); }
    if (model.identifier == null) { set(model, 'identifier', {}); }
  }
}

MdTimePeriodComponent.reopen({
  intervalAmount: alias('model.timeInterval.interval'),
  identifier: alias('model.identifier.identifier'),
});
