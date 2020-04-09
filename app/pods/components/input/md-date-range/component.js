/**
 * @module mdeditor
 * @submodule components-input
 */

import { notEmpty, alias } from '@ember/object/computed';

import Component from '@ember/component';
import { set, get, computed } from '@ember/object';
import { once } from '@ember/runloop';
//import moment from 'moment';

import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({

  start: [
    validator('presence', {
      presence: true,
      disabled: notEmpty('model.end'),
      ignoreBlank: true,
    })
  ],
  end: {
    validators: [
      validator('date', {
        onOrAFter: alias('model.start'),
        isWarning: true
      }),
      validator('presence', {
        presence: true,
        disabled: notEmpty('model.start'),
        ignoreBlank: true,
      } )
    ]
  }
}, {
  message: 'Start or end date/time is required',
  ignoreBlank: true
});

export default Component.extend(Validations, {
  /**
   * Date range with start date and end date fields.
   *
   * ```handlebars
   * \{{input/md-date-range
   *   startDateTime
   *   endDateTime=false
   * }}
   * ```
   *
   * @class md-date-range
   * @extends Ember.Component
   * @constructor
   */

  classNameBindings: ['formInline'],

  /**
   * If true, render the fields inline
   *
   * @property startDateTime
   * @type {Boolean}
   * @default true
   */
  formInline: true,

  /**
   * The value for the start datetime
   *
   * @property startDateTime
   * @type {String|Date|moment}
   * @default moment().hour(0).second(0).minute(0)
   * @required
   */
  //startDateTime: moment().hour(0).second(0).minute(0),

  /**
   * The value for the end datetime
   *
   * @property endDateTime
   * @type {String|Date|moment}
   * @default moment().hour(0).second(0).minute(0)
   * @required
   */
  //  endDateTime: moment().hour(0).second(0).minute(0)
  start: computed('startDateTime', {
    get() {
      let dt = get(this, 'startDateTime');
      return dt === undefined ? null : dt;
    },
    set(key, value) {
      once(this, function() {
        set(this, 'startDateTime', value);
        return value;
      });
    }
  }),
  end: computed('endDateTime', {
    get() {
      let dt = get(this, 'endDateTime');
      return dt === undefined ? null : dt;
    },
    set(key, value) {
      once(this, function() {
        set(this, 'endDateTime', value);
        return value;
      });
    }
  }),
});
