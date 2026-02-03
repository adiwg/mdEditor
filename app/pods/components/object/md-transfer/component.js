import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import EmberObject from '@ember/object';
import { once } from '@ember/runloop';

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

@classic
export default class MdTransferComponent extends Component {
  tagName = 'form';

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
  @alias('model.distributionFormat.firstObject.formatSpecification.title') formatUri;

  get timeUnit() {
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
    ];
  }

  formatTemplate = EmberObject.extend( /*Validations, */ {
    init() {
      this._super(...arguments);
      this.set('formatSpecification', {});
      this.set('formatSpecification.onlineResource', [{}]);
    }
  });

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(function () {
      model.onlineOption = model.onlineOption ?? [];
      model.offlineOption = model.offlineOption ?? [];
      model.transferFrequency = model.transferFrequency ?? {};
      model.distributionFormat = model.distributionFormat ?? [];
      // model.presentationForm = model.presentationForm ?? [];
      // model.onlineResource = model.onlineResource ?? [];
      // model.identifier = model.identifier ?? [];
      // model.graphic = model.graphic ?? [];
    });
  }
}
