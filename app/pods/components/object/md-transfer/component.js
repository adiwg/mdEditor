import {
  alias
} from '@ember/object/computed';
import Component from '@ember/component';
import EmberObject, {
  computed,
  getWithDefault,
  get,
  set
} from '@ember/object';
import {
  once
} from '@ember/runloop';

// const Validations = buildValidations({
//   // 'intervalAmount': [
//   //   validator('presence', {
//   //     presence: true,
//   //     //disabled: computed.notEmpty('model.endDateTime'),
//   //     ignoreBlank: true
//   //   })
//   // ],
//   // 'startDateTime': [
//   //   validator('presence', {
//   //     presence: true,
//   //     disabled: computed.notEmpty('model.endDateTime'),
//   //     ignoreBlank: true
//   //   })
//   // ],
//   // 'endDateTime': [
//   //   validator('date', {
//   //     onOrAfter: computed.alias('model.startDateTime'),
//   //     isWarning: true
//   //   }),
//   //   validator('presence', {
//   //     presence: true,
//   //     disabled: computed.notEmpty('model.startDateTime'),
//   //     ignoreBlank: true
//   //   })
//   // ]
// });

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(function () {
      set(model, 'onlineOption', (model.onlineOption === undefined ? [] : model.onlineOption));
      set(model, 'offlineOption', (model.offlineOption === undefined ? [] : model.offlineOption));
      set(model, 'transferFrequency', (model.transferFrequency === undefined ? {} : model.transferFrequency));
      set(model, 'distributionFormat', (model.distributionFormat === undefined ? [] : model.distributionFormat));
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

  // startDateTime: computed('model.startDateTime', {
  //   get(){
  //     return get(this, 'model.startDateTime');
  //   },
  //   set(key, value) {
  //     once(this,function() {
  //       set(this, 'model.startDateTime', value);
  //       return value;
  //     });
  //   }
  // }),
  // endDateTime: computed('model.endDateTime', {
  //   get(){
  //     return get(this, 'model.endDateTime');
  //   },
  //   set(key, value) {
  //     once(this,function() {
  //       set(this, 'model.endDateTime', value);
  //       return value;
  //     });
  //   }
  // }),
  formatUri: alias(
    'model.distributionFormat.firstObject.formatSpecification.title'),
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
  }),

  formatTemplate: EmberObject.extend( /*Validations, */ {
    init() {
      this._super(...arguments);
      this.set('formatSpecification', {});
      this.set('formatSpecification.onlineResource', [{}]);
    }
  })
});
