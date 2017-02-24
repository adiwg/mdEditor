import Ember from 'ember';
import layout from '../templates/components/tree-search';

const {
  Component,
  isArray,
  set,
  run
} = Ember;

export default Component.extend({
  layout,
  classNames: ['tree-search'],

  searchString: '',
  actualTotal: 0,
  exactMatch: false,
  limit: 50,

  overLimit: Ember.computed('actualTotal', 'limit', function () {
    return this.get('actualTotal') > this.get('limit');
  }),
  searchResult: Ember.computed('searchString', 'exactMatch', function () {
    let pattern = this.get('searchString');
    let result = [];
    let limit = this.get('limit');

    if(pattern.length > 0) {
      result = this.searchTree(this.get('model'), this.get(
          'searchString'))
        .sortBy('label');

      run.once(this, function () {
        this.set('actualTotal', result.length);
      });

      if(result.length > limit) {
        return result.slice(0, limit);
      }
    }

    return result;
  }),
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
      for(i = 0, length = children.length; i < length; i++) {
        let child = children[i];
        set(child,'path', cur.path ? cur.path.concat([cur]) : [cur]);
        queue.push(child);
      }
    }
    return result;
  }
});