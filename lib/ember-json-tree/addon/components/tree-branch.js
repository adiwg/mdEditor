import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/tree-branch';
import { copy } from 'ember-copy';
import { unwrapper } from 'ember-drag-drop/utils/proxy-unproxy-objects';

export default Component.extend({
  /**
   * @class tree-branch
   * @submodule tree-view
   */

  layout,
  tagName: 'li',
  classNames: ['tree-branch', 'list-group-item'],
  classNameBindings: ['model.nodeClass'],

  init() {
    this._super(...arguments);

    this.dragStart = this.dragStart.bind(this);
    this.dragMove = this.dragMove.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragOut = this.dragOut.bind(this);
    this.handleDropAction = this.handleDropAction.bind(this);
  },

  nodePath: computed('path', function () {
    let path = this.get('path');
    let node = copy(path);

    node.push(this.get('model'));

    return node;
  }),
  validateDragEvent: function (event) {
    return this.validateDrag(event);
  },

  dragStart(dragged) {
    this.set('tree.dragged', unwrapper(dragged));
    return false;
  },

  dragMove(event) {
    let moveAction = this.get('dragMoveAction');
    if (moveAction) {
      moveAction(event);
    }
  },

  dragEnd() {
    let endAction = this.get('dragEndAction');
    if (endAction) {
      endAction();
    }
  },

  dragOver() {
    this.set('model._isDragTarget', true);
  },

  dragOut() {
    this.set('model._isDragTarget', false);
  },

  handleDropAction(obj, opts) {
    this.set('model._isDragTarget', false);
    return this.get('handleDrop')(obj, opts);
  },
});
