import Ember from 'ember';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const {
  Component,
  computed: {
    alias,readOnly
  }
} = Ember;

const Validations = buildValidations({
  'north': [
    validator('number', {
      allowNone: false,
      gte: -90,
      lte: 90
    })
  ],
  'south': [
    validator('number', {
      allowNone: false,
      gte: -90,
      lte: 90
    }),
    validator('number', {
      lte: readOnly('model.north')
    })
  ],
  'east': [
    validator('number', {
      allowNone: false,
      gte: -180,
      lte: 180
    })
  ],
  'west': [
    validator('number', {
      allowNone: false,
      gte: -180,
      lte: 180
    }),
    validator('number', {
      lte: readOnly('model.east')
    })
  ]
});

export default Component.extend(Validations, {
  classNames: ['form'],

  north: alias('model.northLatitude'),
  south: alias('model.southLatitude'),
  east: alias('model.eastLongitude'),
  west: alias('model.westLongitude')

  // btnText: computed('isTruelyValid', function() {
  //   let text = this.get('validations.isTruelyValid') ? ''
  //   this.set('btnText', )
  // }),
});
