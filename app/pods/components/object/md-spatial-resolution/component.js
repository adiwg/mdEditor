import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { alias, or } from '@ember/object/computed';
import Component from '@ember/component';
import { isEmpty } from '@ember/utils';
import { once } from '@ember/runloop';
import { set, getWithDefault, get, computed } from '@ember/object';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'scaleFactor': {
    disabled: alias('model.scaleDisabled'),
    validators: [
      validator('presence', {
        presence: true,
        ignoreBlank: true
      }),
      validator('number', {
        integer: true,
        allowBlank: true,
        positive: true,
        gt: 0
      })
    ]
  },
  'levelOfDetail': [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      disabled: alias('model.levelDisabled')
    })
  ],
  'measure': [
    validator('dependent', {
      on: ['measureType', 'measureValue', 'measureUnit']
    })
  ],
  'measureType': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'measureUnit': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'measureValue': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

@classic
@classNames('form')
export default class MdSpatialResolution extends Component.extend(Validations) {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    if(model) {
      once(this, function () {
        set(model, 'measure', getWithDefault(model, 'measure', {}));
      });
    }
  }

  @alias('model.scaleFactor')
  scaleFactor;

  @computed('model.levelOfDetail', 'measurePresent')
  get scaleDisabled() {
    return !isEmpty(this.get('model.levelOfDetail')) || this.measurePresent;
  }

  @alias('model.levelOfDetail')
  levelOfDetail;

  @computed('model.scaleFactor', 'measurePresent')
  get levelDisabled() {
    let scaleFactor = this.get('model.scaleFactor');
    return (!isEmpty(scaleFactor) && !Number.isNaN(scaleFactor)) ||
      this.measurePresent;
  }

  @alias('model.measure')
  measure;

  @computed('model.{scaleFactor,levelOfDetail}')
  get measureDisabled() {
    let scaleFactor = this.get('model.scaleFactor');
    return(!isEmpty(scaleFactor) && !Number.isNaN(scaleFactor)) ||
      !isEmpty(this.get('model.levelOfDetail'));
  }

  @alias('model.measure.type')
  measureType;

  @alias('model.measure.value')
  measureValue;

  @alias('model.measure.unitOfMeasure')
  measureUnit;

  @or('measureType', 'measureUnit', 'measureValue')
  measurePresent;

  @computed
  get typeOptions() {
  return [{
      name: 'distance',
      value: 'distance'
    },
    {
      name: 'length',
      value: 'length'
    },
    {
      name: 'angle',
      value: 'angle'
    },
    {
      name: 'measure',
      value: 'measure'
    },
    {
      name: 'scale',
      value: 'scale'
    }
  ]}
}
