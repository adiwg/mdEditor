import Component from '@ember/component';
import { action, get, set, computed } from '@ember/object';
import { isArray } from '@ember/array';
import layout from '../templates/components/tree-leaf';

export default Component.extend({
  /**
   * @class tree-leaf
   * @submodule tree-view
   */

  layout,
  classNames: ['tree-leaf'],
  classNameBindings: [
    'isSelected:tree-highlight',
    'model._isDragTarget:tree-drag-target',
  ],

  isSelected: computed('selected.[]', 'model.isSelected', function () {
    //this._super(...arguments);

    let selected = this.get('selected');
    let model = this.get('model');
    let isSelected = get(model, 'isSelected');

    if(isArray(selected)) {
      let status = selected.findBy('identifier', get(model,'uuid'));

      if(isSelected === undefined) {
        set(model, 'isSelected', !!status);
      }

      return !!status;
    }

    return isSelected;
  }),

  select(model) {
    return model;
  },

  click() {
    if(get(this, 'model.notSelectable')){
      return false;
    }

    let model = this.get('model');
    let select = this.get('select');
    let path = this.get('nodePath') || get(model, 'path');

    this.toggleProperty('model.isSelected');
    select(model, path);
  },

  dragOver() {
    this.set('model.isExpanded', true);
  },

  @action
  toggleCheck(event) {
    event?.stopPropagation();
    this.toggleProperty('model.isChecked');
  },

  @action
  toggleExpand(event) {
    event?.stopPropagation();
    this.toggleProperty('model.isExpanded');
  }
});
