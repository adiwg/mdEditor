import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { notEmpty, alias } from '@ember/object/computed';
import Component from '@ember/component';
import { set, getWithDefault, get, computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import { once } from '@ember/runloop';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'allocation': [
    validator('array-required', {
      track: ['allocation'],
      disabled: computed(
        'model.timePeriod.{startDateTime,endDateTime}',
        function () {
          let tp = this.model.timePeriod;

          return isPresent(tp) && (tp.startDateTime || tp.endDateTime);
        })
    })
  ],
  'timePeriod': {
    disabled: notEmpty('model.allocation'),
    validators: [
      validator('presence', {
        presence: true,
        ignoreBlank: true,
      }),
      validator('inline', {
        dependentKeys:['model.timePeriod.startDateTime', 'model.timePeriod.endDateTime'],
        validate(value, options, model) {
          return model.get('timePeriod.startDateTime') || model.get(
              'timePeriod.endDateTime') ? true :
            'Time Period should have one of Start Date or End Date.';
        }
      })
    ]
  }
}, {
  message: 'Either an Allocation or valid Time Period is required.'
});

@classic
@tagName('form')
export default class MdFunding extends Component.extend(Validations) {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'allocation', getWithDefault(model, 'allocation', []));
      set(model, 'timePeriod', getWithDefault(model, 'timePeriod', {}));
    });
  }

  @alias('model.allocation')
  allocation;

  @alias('model.timePeriod')
  timePeriod;
}
