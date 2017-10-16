import Ember from 'ember';
import layout from '../templates/components/tree-branch';

const {
  Component
} = Ember;

export default Component.extend({
  /**
   * @class tree-branch
   * @submodule tree-view
   */

  layout,
  tagName: 'li',
  classNames: ['tree-branch list-group-item'],
  nodePath: Ember.computed('path', function () {
    let path = this.get('path');
    let node = path.copy();

    node.push(this.get('model'));

    return node;
  }),
  validateDragEvent: function(event) {
    return this.validateDrag(event);
  },
  actions: {
    dragStart(dragged){
      this.set('dragged', dragged);
    }
  }
});
