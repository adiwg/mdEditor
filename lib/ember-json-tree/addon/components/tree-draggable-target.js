import { set } from '@ember/object';
import DraggableObjectTarget from 'ember-drag-drop/components/draggable-object-target';

export default DraggableObjectTarget.extend({
  tagName: 'div',
  classNames: ['tree-drop-target'],
  attributeBindings: ['style'],
  style: 'display: block; width: 100%;',

  _hoverDepth: 0,

  _getRowLeaf() {
    return this.element.querySelector('.tree-leaf');
  },

  _setHoverState(isHovering) {
    let model = this.model;
    if (model) {
      set(model, '_isDragTarget', isHovering);
    }

    if (this.element) {
      this.element.classList.toggle('accepts-drag', isHovering);
    }

    let leaf = this._getRowLeaf();
    if (leaf) {
      leaf.classList.toggle('tree-drag-target', isHovering);
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this._hoverDepth = 0;

    this._nativeDragOverHandler = (event) => {
      event.preventDefault();
      this._setHoverState(true);
    };

    this._nativeDragEnterHandler = () => {
      this._hoverDepth += 1;
      this._setHoverState(true);
    };

    this._nativeDragLeaveHandler = () => {
      this._hoverDepth = Math.max(0, this._hoverDepth - 1);
      if (this._hoverDepth === 0) {
        this._setHoverState(false);
      }
    };

    this._nativeDropHandler = () => {
      this._hoverDepth = 0;
      this._setHoverState(false);
    };

    this.element.addEventListener('dragover', this._nativeDragOverHandler);
    this.element.addEventListener('dragenter', this._nativeDragEnterHandler);
    this.element.addEventListener('dragleave', this._nativeDragLeaveHandler);
    this.element.addEventListener('drop', this._nativeDropHandler);
  },

  willDestroyElement() {
    if (this.element) {
      this.element.removeEventListener('dragover', this._nativeDragOverHandler);
      this.element.removeEventListener(
        'dragenter',
        this._nativeDragEnterHandler
      );
      this.element.removeEventListener(
        'dragleave',
        this._nativeDragLeaveHandler
      );
      this.element.removeEventListener('drop', this._nativeDropHandler);
    }

    this._nativeDragOverHandler = null;
    this._nativeDragEnterHandler = null;
    this._nativeDragLeaveHandler = null;
    this._nativeDropHandler = null;

    this._super(...arguments);
  },

  handleDragOver(event) {
    this._super(...arguments);

    this._setHoverState(true);

    return event;
  },

  handleDragOut(event) {
    this._super(...arguments);
    this._hoverDepth = 0;

    this._setHoverState(false);

    return event;
  },

  acceptDrop(event) {
    this._hoverDepth = 0;
    this._setHoverState(false);

    this._super(...arguments);
    return event;
  },
});
