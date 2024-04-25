import { notEmpty, alias } from '@ember/object/computed';
import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { once } from '@ember/runloop';

import { validator, buildValidations } from 'ember-cp-validations';

const timeUnit = [
  {
    name: 'year',
    value: 'year',
  },
  {
    name: 'month',
    value: 'month',
  },
  {
    name: 'day',
    value: 'day',
  },
  {
    name: 'hour',
    value: 'hour',
  },
  {
    name: 'minute',
    value: 'minute',
  },
  {
    name: 'second',
    value: 'second',
  },
];

const durationUnit = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];

const Validations = buildValidations({
  intervalAmount: [
    validator('presence', {
      presence: true,
      //disabled: computed.notEmpty('model.endDateTime'),
      ignoreBlank: true,
    }),
  ],
  startDateTime: [
    validator('presence', {
      presence: true,
      disabled: notEmpty('model.endDateTime'),
      ignoreBlank: true,
    }),
  ],
  endDateTime: [
    validator('date', {
      onOrAfter: alias('model.startDateTime'),
      isWarning: true,
    }),
    validator('presence', {
      presence: true,
      disabled: notEmpty('model.startDateTime'),
      ignoreBlank: true,
    }),
  ],
});

export default Component.extend(Validations, {
  init() {
    this._super(...arguments);

    this.timeUnit = timeUnit;
    this.durationUnit = durationUnit;
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(this, function () {
      set(
        model,
        'periodName',
        get(model, 'periodName') !== undefined ? get(model, 'periodName') : [],
      );
      set(
        model,
        'timeInterval',
        get(model, 'timeInterval') !== undefined
          ? get(model, 'timeInterval')
          : {},
      );
      set(
        model,
        'duration',
        get(model, 'duration') !== undefined ? get(model, 'duration') : {},
      );
      // set(model, 'presentationForm', getWithDefault(model,
      //   'presentationForm', []));
      // set(model, 'onlineResource', getWithDefault(model,
      //   'onlineResource', []));
      set(
        model,
        'identifier',
        get(model, 'identifier') !== undefined ? get(model, 'identifier') : {},
      );
      // set(model, 'graphic', getWithDefault(model, 'graphic', []));
    });
  },
  tagName: 'form',

  /**
   * The profile path for the component
   *
   * @property profilePath
   * @type {String}
   */

  startDateTime: computed('model.startDateTime', {
    get() {
      return get(this, 'model.startDateTime');
    },
    set(key, value) {
      once(this, function () {
        set(this, 'model.startDateTime', value);
        return value;
      });
    },
  }),
  endDateTime: computed('model.endDateTime', {
    get() {
      return get(this, 'model.endDateTime');
    },
    set(key, value) {
      once(this, function () {
        set(this, 'model.endDateTime', value);
        return value;
      });
    },
  }),
  intervalAmount: alias('model.timeInterval.interval'),
  identifier: alias('model.identifier.identifier'),

  timeUnit: timeUnit,
  durationUnit: durationUnit,
});
