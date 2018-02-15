import Draggable from 'ember-drag-drop/components/draggable-object';

export default Draggable.extend({
  dragStart(event){
    if(event.currentTarget.getElementsByClassName('is-dragging-object').length){
      return;
    }

    this._super(...arguments);
  }
});
