import Identifier from '../md-identifier-array/component';

export default Identifier.extend({
  /**
   * mdEditor class for input and edit of mdJSON 'identifier' object
   * arrays.
   * The class manages the maintenance of an array of identifier
   * objects using the md-object-table class.
   *
   * @module mdeditor
   * @submodule components-object
   * @class md-identifier-object-table
   * @uses md-object-table
   * @constructor
   */

  /**
   * Label for the panel
   *
   * @property label
   * @type {String}
   * @default undefined
   */

  /**
   * Array of identifiers
   *
   * @property model
   * @type {Array}
   * @default undefined
   */

  /**
   * Attributes displayed in the preview table.
   *
   * @property attributes
   * @type {String}
   * @default 'identifier,namespace'
   */
  attributes: 'identifier,namespace',

  ellipsis: true,

  /**
   * Default profile visibility
   *
   * @property visibility
   * @type {Boolean}
   * @default false
   */
  visibility: false,
});
