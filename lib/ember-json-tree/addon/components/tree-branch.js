import Ember from 'ember';
import layout from '../templates/components/tree-branch';

const {
  Component,
  A
} = Ember;

export default Component.extend({
  layout,
  tagName: 'li',
  classNames: ['tree-branch list-group-item'],
  nodePath: Ember.computed('label', function () {
    let path = this.get('path');
    let node = path.copy();

    node.push(this.get('model.label'));
    return node;
  })
});
