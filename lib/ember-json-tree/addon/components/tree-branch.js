import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/tree-branch';

export default Component.extend({
  /**
   * @class tree-branch
   * @submodule tree-view
   */

  layout,
  tagName: 'li',
  classNames: ['tree-branch', 'list-group-item'],
  classNameBindings:['model.nodeClass'],
  nodePath: computed('path', function () {
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
      this.set('tree.dragged', dragged);

      return false;
    }
  }
});
