import Ember from 'ember';
import layout from '../templates/components/tree-view';

const {
  Component
} = Ember;

export default Component.extend({
  /**
   * @class tree-view
   * @submodule tree-view
   */

  layout,
  tagName: 'ul',
  classNames: ['tree-trunk list-group'],

  parentDepth: 0,
  parentPath: Ember.A(),
  nodeDepth: Ember.computed('depth', function() {
    return this.get('parentDepth') + 1;
  }),

  /**
   * Array containing initially selected node objects (models).
   * Objects in the array must have an identifier property.
   *
   * @property selected
   * @type {Array}
   */

  /**
   * Message to display when model is empty.
   *
   * @property emptyMessage
   * @type {String}
   */

  /**
   * Called when a tree node is selected. Override as needed.
   *
   * @param  {Object} model selected leaf node model
   * @param  {Object} path selected leaf path
   * @return {Object}       selected leaf node model
   */
  select: function(model) {
    return model;
  },

  /**
   * Validates drag events. Override this to restrict which data types your
   * component accepts.
   *
   * Example:
   *
   * ```js
   * validateDragEvent: function(event) {
   *   return event.dataTransfer.types.contains('text/x-foo');
   * }
   * ```
   *
   * @method validateDragEvent
   * @public
   */

  validateDrag: function() {
    return true;
  }

});
