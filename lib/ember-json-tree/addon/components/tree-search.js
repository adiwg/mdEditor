import Component from '@ember/component';
import { isArray } from '@ember/array';
import { set, computed } from '@ember/object';
import { run } from '@ember/runloop';
import layout from '../templates/components/tree-search';

export default Component.extend({
  /**
   * @class tree-search
   * @submodule tree-search
   */

  layout,
  classNames: ['tree-search'],

  /**
   * The search string to search for.
   *
   * @property searchString
   * @type {String}
   * @default ""
   * @required
   */
  searchString: '',

  /**
   * The actual total number of nodes matching the search
   *
   * @property actualTotal
   * @type {Integer}
   * @default 0
   */
  actualTotal: 0,

  /**
   * If true, the searchString musst match exactly from the start
   *
   * @property exactMatch
   * @type {Boolean}
   * @default false
   */
  exactMatch: false,

  /**
   * The number of results to display
   *
   * @property limit
   * @type {Integer}
   * @default 50
   */
  limit: 50,

  select(model) {
    return model;
  },

  /**
   * If the actual length of the search result is > limit.
   *
   * @property overLimit
   * @type {Boolean}
   * @required actualTotal,limit
   */
  overLimit: computed('actualTotal', 'limit', function () {
    return this.get('actualTotal') > this.get('limit');
  }),

  /**
   * The result of the search truncated to the limit
   *
   * @property searchResult
   * @type {Array}
   * @required searchString,exactMatch
   */
  searchResult: computed('searchString', 'exactMatch', function () {
    let pattern = this.get('searchString');
    let result = [];
    let limit = this.get('limit');

    if(pattern.length > 0) {
      result = this.searchTree(this.get('model'), this.get(
        'searchString')).sortBy('label');

      run.once(this, function () {
        this.set('actualTotal', result.length);
      });

      if(result.length > limit) {
        return result.slice(0, limit);
      }
    }

    return result;
  }),

  /**
   * Search the tree
   *
   * @method searchTree
   * @param {Object} node The tree node to search
   * @param {String} pattern The string to search for
   * @return {Array} The matching nodes
   */
  searchTree(node, pattern) {
    let cur, children, i, length,
      queue = isArray(node) ? node.slice(0) : [node];

    let result = [];

    if(node == null) {
      return node;
    }

    if(pattern && pattern.length > 0) {
      if(this.get('exactMatch')) {
        pattern = '^' + pattern;
      }
    }

    while(queue.length) {
      cur = queue.shift();

      if(typeof cur.label === 'string') {
        if(cur.label.match(new RegExp(pattern, 'i'))) {
          result.pushObject(cur);
        }
      }

      children = cur.children || [];

      if(children.length) {
        for(i = 0, length = children.length; i < length; i++) {
          let child = children[i];
          if(!child.path) {
            set(child, 'path', cur.path ? cur.path.concat([cur]) : [cur]);
          }
          queue.push(child);
        }
      }

      if(!cur.path || cur.path.indexOf(cur) === -1) {
        set(cur, 'path', isArray(cur.path) ? cur.path.concat([cur]) : [
          cur
        ]);
      }
    }
    return result;
  }
});
