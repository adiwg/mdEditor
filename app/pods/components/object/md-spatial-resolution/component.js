import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { isEmpty } from '@ember/utils';
import { alias } from '@ember/object/computed';
import { once } from '@ember/runloop';
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
export default class MdSpatialResolutionComponent extends Component.extend(Validations) {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    if(model) {
      once(this, function () {
        model.measure = model.measure ?? {};
      });
    }
  }

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

  classNames = ['form'];

  @alias('model.scaleFactor') scaleFactor;

  get scaleDisabled() {
    return !isEmpty(this.model?.levelOfDetail) || this.measurePresent;
  }

  @alias('model.levelOfDetail') levelOfDetail;

  get levelDisabled() {
    let scaleFactor = this.model?.scaleFactor;
    return (!isEmpty(scaleFactor) && !Number.isNaN(scaleFactor)) ||
      this.measurePresent;
  }

  @alias('model.measure') measure;

  get measureDisabled() {
    let scaleFactor = this.model?.scaleFactor;
    return(!isEmpty(scaleFactor) && !Number.isNaN(scaleFactor)) ||
      !isEmpty(this.model?.levelOfDetail);
  }

  @alias('model.measure.type') measureType;
  @alias('model.measure.value') measureValue;
  @alias('model.measure.unitOfMeasure') measureUnit;

  get measurePresent() {
    return this.measureType || this.measureUnit || this.measureValue;
  }

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
    ];
  }
}
