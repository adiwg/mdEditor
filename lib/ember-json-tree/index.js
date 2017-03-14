/**
 * Renders JSON tree structures. Also provides a seach component.
 *
 * @module ember-json-tree
 * @category docs
 */

/**
 * Renders JSON tree structures.
 *
 * @module ember-json-tree
 * @submodule tree-view
 * @main tree-view
 * @category docs
 */

/**
 * Renders a search form and results for JSON trees.
 *
 * @module ember-json-tree
 * @submodule tree-search
 * @main tree-search
 * @category docs
 */

/**
 * Ember HTMLBars helpers.
 *
 * @module ember-json-tree
 * @submodule helpers
 * @main helpers
 * @category docs
 */

/*jshint node:true*/
module.exports = {
  name: 'ember-json-tree',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app, parentAddon) {
    var target = (parentAddon || app);
    target.options = target.options || {};
    target.options.babel = target.options.babel || { includePolyfill: true };
    return this._super.included(target);
  }
};
