import { set } from '@ember/object';
import DraggableObjectTarget from 'ember-drag-drop/components/draggable-object-target';

export default DraggableObjectTarget.extend({
  handleDragOver(event) {
    this._super(...arguments);

    let model = this.get('model');
    if (model) {
      set(model, '_isDragTarget', true);
    }

    return event;
  },

  handleDragOut(event) {
    this._super(...arguments);

    let model = this.get('model');
    if (model) {
      set(model, '_isDragTarget', false);
    }

    return event;
  },

  acceptDrop(event) {
    let model = this.get('model');
    if (model) {
      set(model, '_isDragTarget', false);
    }

    this._super(...arguments);
    return event;
  },
});
