import classic from 'ember-classic-decorator';
import Identifier from '../md-identifier-array/component';

/**
 * mdEditor class for input and edit of mdJSON 'identifier' object arrays.
 * The class manages the maintenance of an array of identifier objects
 * using the md-object-table class.
 *
 * @module mdeditor
 * @submodule components-object
 * @class md-identifier-object-table
 * @extends md-identifier-array
 */
@classic
export default class MdIdentifierObjectTableComponent extends Identifier {
  /**
   * Preview columns: inherits md-identifier-array default
   * (`identifier,namespace,description`). A classic `.extend()` override of
   * `identifier,namespace` did not replace the parent class field.
   */
  ellipsis = true;

  visibility = false;
}
