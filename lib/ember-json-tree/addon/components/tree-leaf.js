import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { isArray } from '@ember/array';
import layout from '../templates/components/tree-leaf';

export default Component.extend({
  /**
   * @class tree-leaf
   * @submodule tree-view
   */

  layout,
  classNames: ['tree-leaf'],
  classNameBindings: ['isSelected:tree-highlight'],

  isSelected: computed('selected.[]', 'model.isSelected', function () {
    //this._super(...arguments);

    let selected = this.selected;
    let model = this.model;
    let isSelected = model.isSelected;

    if(isArray(selected)) {
      let status = selected.findBy('identifier', model.uuid);

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

    let model = this.model;
    let select = this.select;
    let path = this.nodePath || model.path;

    //set(model, 'isSelected', !model.isSelected);
    this.toggleProperty('model.isSelected');
    select(model, path);
  },

  dragOver() {
    this.set('model.isExpanded', true);
  },

  actions: {
    toggleCheck() {
      this.toggleProperty('model.isChecked');
      //ev.stopPropagation();
    },

    toggleExpand() {
      this.toggleProperty('model.isExpanded');
      //ev.stopPropagation();
    }
  }
});
