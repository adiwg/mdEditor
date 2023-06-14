import Component from '@ember/component';
import { computed, set, getWithDefault, get } from '@ember/object';
import { alias, notEmpty } from '@ember/object/computed';
import { isPresent } from '@ember/utils';
import { once } from '@ember/runloop';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations(
  {
    allocation: [
      validator('array-required', {
        track: ['allocation'],
        disabled: computed(
          'model.timePeriod.{startDateTime,endDateTime}',
          function () {
            let tp = this.model.timePeriod;

            return isPresent(tp) && (tp.startDateTime || tp.endDateTime);
          }
        ),
      }),
    ],
    timePeriod: {
      disabled: notEmpty('model.allocation'),
      validators: [
        validator('presence', {
          presence: true,
          ignoreBlank: true,
        }),
        validator('inline', {
          dependentKeys: [
            'model.timePeriod.startDateTime',
            'model.timePeriod.endDateTime',
          ],
          validate(value, options, model) {
            return model.get('timePeriod.startDateTime') ||
              model.get('timePeriod.endDateTime')
              ? true
              : 'Time Period should have one of Start Date or End Date.';
          },
        }),
      ],
    },
  },
  {
    message: 'Either an Allocation or valid Time Period is required.',
  }
);

export default Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'allocation', getWithDefault(model, 'allocation', []));
      set(model, 'timePeriod', getWithDefault(model, 'timePeriod', {}));
    });
  },
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

  tagName: 'form',
  allocation: alias('model.allocation'),
  timePeriod: alias('model.timePeriod'),
});
