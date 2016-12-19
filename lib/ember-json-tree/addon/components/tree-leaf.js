import Ember from 'ember';
import layout from '../templates/components/tree-leaf';

const {
  Component,
  set,
  isArray
} = Ember;

export default Component.extend({
  layout,
  classNames: ['tree-leaf'],
  classNameBindings: ['isSelected:tree-highlight'],

  isSelected: Ember.computed('selected.[]','model.isSelected', function() {
    //this._super(...arguments);

    let selected = this.get('selected');
    let model = this.get('model');

    if(isArray(selected)) {
      let status = selected.findBy('identifier', model.uuid);

      //set(model, 'isSelected', !!status);
      return !!status;
    }

    return model.isSelected;
  }),

  didInsertElement() {
    this._super(...arguments);
    this.$('[data-toggle="tooltip"]')
      .tooltip();
  },

  select(model) {
    return model;
  },

  click() {
    let model = this.get('model');
    let select = this.get('select');
    let path = this.get('nodePath') || model.path;

    set(model, 'isSelected', !model.isSelected);
    select(model, path);
  },

  // mouseEnter(event) {
  //   let { hover } = this.attrs;
  //   if (hover) {
  //     hover(this.get('model'));
  //   }
  // },

  actions: {
    toggleCheck() {
      this.toggleProperty('model.isChecked');
    },

    toggleExpand() {
      this.toggleProperty('model.isExpanded');
    }
  }
});
