import Ember from 'ember';
import layout from '../templates/components/tree-leaf';

const {
  Component,
  set,
  isArray
} = Ember;

export default Component.extend({
  /**
   * @class tree-leaf
   * @submodule tree-view
   */

  layout,
  classNames: ['tree-leaf'],
  classNameBindings: ['isSelected:tree-highlight'],

  isSelected: Ember.computed('selected.[]', 'model.isSelected', function () {
    //this._super(...arguments);

    let selected = this.get('selected');
    let model = this.get('model');

    if(isArray(selected)) {
      let status = selected.findBy('identifier', model.uuid);

      if(model.isSelected === undefined) {
        set(model, 'isSelected', !!status);
      }

      return !!status;
    }

    return model.isSelected;
  }),

  select(model) {
    return model;
  },

  click() {
    let model = this.get('model');
    let select = this.get('select');
    let path = this.get('nodePath') || model.path;

    //set(model, 'isSelected', !model.isSelected);
    this.toggleProperty('model.isSelected');
    select(model, path);
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
