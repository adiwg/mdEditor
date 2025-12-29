import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { Validations } from '../component';

@classic
@tagName('form')
export default class Preview extends Component.extend(Validations) {
 /**
  * 'name is the alias for 'coverageName' used in the validations for the
  * 'raster/preview' object.
  *
  * @property name
  * @type String
  * @requires alias
  * @default "alias('model.coverageName')"
  */
 @alias('item.coverageName')
 name;

 /**
  * 'description' is the alias for 'coverageDescription' used in the validations for the
  * 'raster/preview' object.
  *
  * @property description
  * @type String
  * @requires alias
  * @default "alias('model.coverageDescription')"
  */
 @alias('item.coverageDescription')
 description;
}
