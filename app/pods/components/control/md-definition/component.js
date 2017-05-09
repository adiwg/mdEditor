import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * mdEditor Component that renders a definition
   *
   * @class md-definition
   * @module mdeditor
   * @submodule components-control
   * @constructor
   */

  tagName: '',

  /**
   * The definition title
   *
   * @property title
   * @type {String}
   */

  /**
   * The definition text
   *
   * @property text
   * @type {String}
   * @required
   */

  /**
   * The text to display if the text is falsy.
   *
   * @property empty
   * @type {String}
   * @default  'Not Defined'
   */
  empty: 'Not Defined'
});
