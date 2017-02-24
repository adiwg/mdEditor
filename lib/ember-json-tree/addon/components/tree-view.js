import Ember from 'ember';
import layout from '../templates/components/tree-view';

const {
  Component
} = Ember;

export default Component.extend({
  layout,
  tagName: 'ul',
  classNames: ['tree-trunk list-group'],

  parentDepth: 0,
  parentPath: Ember.A(),
  nodeDepth: Ember.computed('depth', function () {
    return this.get('parentDepth') + 1;
  }),
  select(model) {
    return model;
  }
});
