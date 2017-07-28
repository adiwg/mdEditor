import Ember from 'ember';

import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const {
  Component,
  computed,
  set,
  get,
  getWithDefault,
  run: {
    once
  }
} = Ember;

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
      disabled: computed.notEmpty('model.endDateTime'),
      ignoreBlank: true
    })
  ],
  'endDateTime': [
    validator('date', {
      onOrAfter: computed.alias('model.startDateTime'),
      isWarning: true
    }),
    validator('presence', {
      presence: true,
      disabled: computed.notEmpty('model.startDateTime'),
      ignoreBlank: true
    })
  ]
});

export default Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    once(function () {
      set(model, 'periodName', getWithDefault(model,
        'periodName', []));
      set(model, 'timeInterval', getWithDefault(model, 'timeInterval', {}));
      set(model, 'duration', getWithDefault(model, 'duration', {}));
      // set(model, 'presentationForm', getWithDefault(model,
      //   'presentationForm', []));
      // set(model, 'onlineResource', getWithDefault(model,
      //   'onlineResource', []));
      // set(model, 'identifier', getWithDefault(model, 'identifier', []));
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

  startDateTime: computed.alias('model.startDateTime'),
  endDateTime: computed.alias('model.endDateTime'),
  intervalAmount: computed.alias('model.interval.interval'),
  timeUnit: [{
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
  ]

});
