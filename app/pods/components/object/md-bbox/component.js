import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { readOnly, alias } from '@ember/object/computed';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  north: [
    validator('number', {
      allowNone: false,
      gte: -90,
      lte: 90,
    }),
  ],
  south: [
    validator('number', {
      allowNone: false,
      gte: -90,
      lte: 90,
    }),
    validator('number', {
      lte: readOnly('model.north'),
    }),
  ],
  east: [
    validator('number', {
      allowNone: false,
      gte: -180,
      lte: 180,
    }),
  ],
  west: [
    validator('number', {
      allowNone: false,
      gte: -180,
      lte: 180,
    }),
    validator('number', {
      lte: readOnly('model.east'),
    }),
  ],
});

@classic
export default class MdBboxComponent extends Component.extend(Validations) {
  classNames = ['form'];

  @alias('model.northLatitude') north;
  @alias('model.southLatitude') south;
  @alias('model.eastLongitude') east;
  @alias('model.westLongitude') west;
  @alias('model.minimumAltitude') minimumAltitude;
  @alias('model.maximumAltitude') maximumAltitude;
  @alias('model.unitsOfAltitude') unitsOfAltitude;

  // btnText: computed('isTruelyValid', function() {
  //   let text = this.get('validations.isTruelyValid') ? ''
  //   this.set('btnText', )
  // }),
}
