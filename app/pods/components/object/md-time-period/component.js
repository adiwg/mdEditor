import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { get, set } from '@ember/object';
import { once } from '@ember/runloop';
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
    return value;
  }

  get endDateTime() {
    return get(this, 'model.endDateTime');
  }

  set endDateTime(value) {
    once(this, function () {
      set(this, 'model.endDateTime', value);
    });
    return value;
  }

  @alias('model.timeInterval.interval') intervalAmount;
  @alias('model.identifier.identifier') identifier;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      model.periodName = model.periodName ?? [];
      model.timeInterval = model.timeInterval ?? {};
      model.duration = model.duration ?? {};
      // model.presentationForm = model.presentationForm ?? [];
      // model.onlineResource = model.onlineResource ?? [];
      model.identifier = model.identifier ?? {};
      // model.graphic = model.graphic ?? [];
    });
  }
}
