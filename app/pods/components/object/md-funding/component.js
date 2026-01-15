import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { alias, notEmpty } from '@ember/object/computed';
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
export default class MdFundingComponent extends Component.extend(Validations) {
  /**
   * The string representing the path in the profile object for the resource.
   *
   * @property profilePath
   * @type {String}
   * @default 'false'
   * @required
   */

  /**
   * The object to use as the data model for the resource.
   *
   * @property model
   * @type {Object}
   * @required
   */

  tagName = 'form';

  @alias('model.allocation') allocation;
  @alias('model.timePeriod') timePeriod;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      model.allocation = model.allocation ?? [];
      model.timePeriod = model.timePeriod ?? {};
    });
  }
}
