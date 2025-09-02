import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { alias, notEmpty } from '@ember/object/computed';
import Component from '@ember/component';
import {
  getWithDefault,
  get,
  set,
  computed
} from '@ember/object';
import {
  once
} from '@ember/runloop';

import {
  validator,
  buildValidations
} from 'ember-cp-validations';

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
      disabled: notEmpty('model.endDateTime'),
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
      disabled: notEmpty('model.startDateTime'),
      ignoreBlank: true
    })
  ]
});

@classic
@tagName('form')
export default class MdTimePeriod extends Component.extend(Validations) {
  init() {
    super.init(...arguments);

    this.timeUnit = timeUnit;
    this.durationUnit = durationUnit;
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'periodName', getWithDefault(model,
        'periodName', []));
      set(model, 'timeInterval', getWithDefault(model, 'timeInterval', {}));
      set(model, 'duration', getWithDefault(model, 'duration', {}));
      // set(model, 'presentationForm', getWithDefault(model,
      //   'presentationForm', []));
      // set(model, 'onlineResource', getWithDefault(model,
      //   'onlineResource', []));
      set(model, 'identifier', getWithDefault(model, 'identifier', {}));
      // set(model, 'graphic', getWithDefault(model, 'graphic', []));
    });
  }

  /**
   * The profile path for the component
   *
   * @property profilePath
   * @type {String}
   */

  @computed('model.startDateTime')
  get startDateTime() {
    return get(this, 'model.startDateTime');
  }

  set startDateTime(value) {
    once(this, function () {
      set(this, 'model.startDateTime', value);
      return value;
    });
  }

  @computed('model.endDateTime')
  get endDateTime() {
    return get(this, 'model.endDateTime');
  }

  set endDateTime(value) {
    once(this, function () {
      set(this, 'model.endDateTime', value);
      return value;
    });
  }

  @alias('model.timeInterval.interval')
  intervalAmount;

  @alias('model.identifier.identifier')
  identifier;

  timeUnit = timeUnit;
  durationUnit = durationUnit;
}
