import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
import { Validations } from '../component';

/**
 * mdEditor class for input and edit of mdJSON 'coverageDescription' object.
 * The class manages the maintenance of an array of raster objects.
 *
 * @class md-raster-preview
 * @module mdeditor
 * @submodule components-object-md-raster
 * @constructor
 */
@classic
export default class PreviewComponent extends Component.extend(Validations) {
  tagName = 'form';

  /**
   * 'name is the alias for 'coverageName' used in the validations for the
   * 'raster/preview' object.
   *
   * @property name
   * @type String
   * @requires alias
   * @default "alias('model.coverageName')"
   */
  @alias('item.coverageName') name;

  /**
   * 'description' is the alias for 'coverageDescription' used in the validations for the
   * 'raster/preview' object.
   *
   * @property description
   * @type String
   * @requires alias
   * @default "alias('model.coverageDescription')"
   */
  @alias('item.coverageDescription') description;
}
