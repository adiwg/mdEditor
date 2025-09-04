import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/tree-branch';
import { copy } from 'mdeditor/utils/copy';
import { unwrapper } from 'ember-drag-drop/utils/proxy-unproxy-objects';

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
    let node = copy(path);

    node.push(this.get('model'));

    return node;
  }),
  validateDragEvent: function(event) {
    return this.validateDrag(event);
  },
  actions: {
    dragStart(dragged){
      this.set('tree.dragged', unwrapper(dragged));

      return false;
    }
  }
});
