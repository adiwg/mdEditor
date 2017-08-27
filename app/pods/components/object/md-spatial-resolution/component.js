import Ember from 'ember';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const {
  Component,
  computed,
  isEmpty,
  computed: {
    alias,or
  },
  get,
  run: {
    once
  },
  getWithDefault,
  set
} = Ember;

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

export default Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    once(this, function() {
      set(model, 'measure', getWithDefault(model, 'measure', {}));
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

  classNames: ['form'],
  scaleFactor: alias('model.scaleFactor'),
  scaleDisabled: computed(
    'model.levelOfDetail', 'measurePresent',
    function() {
      return !isEmpty(this.get('model.levelOfDetail')) || this.get(
        'measurePresent'
      );
    }),
  levelOfDetail: alias('model.levelOfDetail'),
  levelDisabled: computed(
    'model.scaleFactor', 'measurePresent',
    function() {
      let scaleFactor = this.get('model.scaleFactor');
      return(!isEmpty(scaleFactor) && !Number.isNaN(scaleFactor)) ||
        this.get(
          'measurePresent'
        );
    }
  ),
  measure: alias('model.measure'),
  measureDisabled: computed(
    'model.scaleFactor', 'model.levelOfDetail',
    function() {
      let scaleFactor = this.get('model.scaleFactor');
      return(!isEmpty(scaleFactor) && !Number.isNaN(scaleFactor)) ||
        !isEmpty(this.get('model.levelOfDetail'));
    }
  ),
  measureType: alias('model.measure.type'),
  measureValue: alias('model.measure.value'),
  measureUnit: alias('model.measure.unitOfMeasure'),
  measurePresent: or('measureType','measureUnit','measureValue'),

  typeOptions: [{
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
  ]
});
