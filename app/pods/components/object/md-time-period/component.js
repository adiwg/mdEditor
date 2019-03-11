import {
  notEmpty,
  alias
} from '@ember/object/computed';
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

  startDateTime: computed('model.startDateTime', {
    get() {
      return get(this, 'model.startDateTime');
    },
    set(key, value) {
      once(this, function () {
        set(this, 'model.startDateTime', value);
        return value;
      });
    }
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
    }
  }),
  intervalAmount: alias('model.timeInterval.interval'),

  timeUnit: computed(function () {
    return [{
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
  })

});
