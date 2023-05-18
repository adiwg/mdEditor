import { set } from '@ember/object';
import { get } from '@ember/object';
import { A } from '@ember/array';
import Component from '@ember/component';
import { computed, getWithDefault } from '@ember/object';
import layout from '../templates/components/tree-view';

export default Component.extend({
  /**
   * @class tree-view
   * @submodule tree-view
   */

  init() {
    this._super(...arguments);

    this.set('tree', (this.tree === undefined ? this : this.tree));
    set(this, 'sortKeys', ['label']);
  },

  layout,
  tagName: 'ul',
  classNames: ['tree-trunk list-group'],

  parentDepth: 0,
  parentPath: A(),
  nodeDepth: computed('depth', 'parentDepth', function() {
    return this.parentDepth + 1;
  }),
  sorted: computed('model', 'sortKeys', function() {
    let model = this.model;

    if(model) {
      let keys = this.sortKeys;

      return model.sortBy(...keys);
    }
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
   * @method select
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
  },

  handleDrop: function() {
    return true;
  }
});
