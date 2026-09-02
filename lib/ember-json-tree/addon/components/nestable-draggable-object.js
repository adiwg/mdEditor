import Draggable from 'ember-drag-drop/components/draggable-object';

const TRANSPARENT_DRAG_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export default Draggable.extend({
  _dragPreview: null,
  _dragOverHandler: null,
  _dropHighlightHandler: null,
  _activeDropTarget: null,
  _dragSourceRow: null,

  _getDragSource(event) {
    let dropZone = this.element.querySelector('.draggable-object-target');
    let row =
      event.target && event.target.closest
        ? event.target.closest('.tree-leaf')
        : null;

    if (row && dropZone && dropZone.contains(row)) {
      return row;
    }

    if (dropZone) {
      return dropZone.querySelector('.tree-leaf');
    }

    return null;
  },

  _cleanupDragPreview() {
    let preview = this._dragPreview;
    if (preview && preview.parentNode) {
      preview.parentNode.removeChild(preview);
    }
    this.set('_dragPreview', null);

    let dragOverHandler = this._dragOverHandler;
    if (dragOverHandler) {
      document.removeEventListener('dragover', dragOverHandler, true);
      this.set('_dragOverHandler', null);
    }
  },

  _clearDropHighlight() {
    let activeTarget = this._activeDropTarget;
    if (!activeTarget) {
      return;
    }

    activeTarget.classList.remove('accepts-drag');
    let leaf = activeTarget.querySelector('.tree-leaf');
    if (leaf) {
      leaf.classList.remove('tree-drag-target');
    }

    this._activeDropTarget = null;
  },

  _cleanupDropHighlight() {
    this._clearDropHighlight();

    let dropHighlightHandler = this._dropHighlightHandler;
    if (dropHighlightHandler) {
      document.removeEventListener('dragover', dropHighlightHandler, true);
      this._dropHighlightHandler = null;
    }
  },

  _moveDragPreview(event) {
    let preview = this._dragPreview;
    if (!preview) {
      return;
    }

    let x = event && typeof event.clientX === 'number' ? event.clientX : null;
    let y = event && typeof event.clientY === 'number' ? event.clientY : null;

    if (x === null || y === null) {
      return;
    }

    preview.style.left = `${Math.max(0, x + 12)}px`;
    preview.style.top = `${Math.max(0, y + 12)}px`;
  },

  _activateDropHighlight() {
    this._cleanupDropHighlight();

    this._dropHighlightHandler = (event) => {
      event.preventDefault();

      let dropTarget = event.target.closest('.draggable-object-target');
      let treeRoot = event.target.closest('.tree-trunk');

      if (!treeRoot || !dropTarget) {
        this._clearDropHighlight();
        return;
      }

      if (dropTarget === this._activeDropTarget) {
        return;
      }

      this._clearDropHighlight();
      this._activeDropTarget = dropTarget;
      dropTarget.classList.add('accepts-drag');

      let leaf = dropTarget.querySelector('.tree-leaf');
      if (leaf) {
        leaf.classList.add('tree-drag-target');
      }
    };

    document.addEventListener('dragover', this._dropHighlightHandler, true);
  },

  dragStart(event) {
    if (event.currentTarget.getElementsByClassName('is-dragging-object').length) {
      return;
    }

    this._super(...arguments);

    if (!this.isDraggingObject) {
      return;
    }

    this._cleanupDragPreview();
    this._cleanupDropHighlight();

    let source = this._getDragSource(event);
    if (!source) {
      return;
    }

    this._dragSourceRow = source;

    let rect = source.getBoundingClientRect();
    let preview = source.cloneNode(true);

    preview.classList.add('tree-drag-preview', 'tree-drag-floating');
    preview.style.position = 'fixed';
    preview.style.left = `${Math.max(0, rect.left + 12)}px`;
    preview.style.top = `${Math.max(0, rect.top + 12)}px`;
    preview.style.width = `${rect.width}px`;
    preview.style.maxWidth = `${rect.width}px`;
    preview.style.pointerEvents = 'none';
    preview.style.zIndex = '99999';

    document.body.appendChild(preview);
    this.set('_dragPreview', preview);

    let dragOverHandler = (evt) => this._moveDragPreview(evt);
    document.addEventListener('dragover', dragOverHandler, true);
    this.set('_dragOverHandler', dragOverHandler);
    this._moveDragPreview(event);
    this._activateDropHighlight();

    if (event.dataTransfer && event.dataTransfer.setDragImage) {
      try {
        let transparent = new Image();
        transparent.src = TRANSPARENT_DRAG_IMAGE;
        event.dataTransfer.setDragImage(transparent, 0, 0);
      } catch (_error) {
        // Keep browser-native fallback behavior if custom drag image is rejected.
      }
      event.dataTransfer.effectAllowed = 'move';
    }
  },

  drag(event) {
    this._super(...arguments);
    this._moveDragPreview(event);
  },

  dragStartHook(event) {
    let row = this._dragSourceRow || this._getDragSource(event);
    if (row) {
      row.style.opacity = '0.5';
    }
  },

  dragEndHook() {
    let row = this._dragSourceRow;
    if (row) {
      row.style.opacity = '1';
    }
    this._dragSourceRow = null;
  },

  dragEnd() {
    this._cleanupDragPreview();
    this._cleanupDropHighlight();
    this._super(...arguments);
  },

  willDestroyElement() {
    this._cleanupDragPreview();
    this._cleanupDropHighlight();
    this._super(...arguments);
  },
});
