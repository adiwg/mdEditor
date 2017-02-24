import Ember from 'ember';
import layout from '../templates/components/tree-leaf';

const {
  Component,
  set
} = Ember;

export default Component.extend({
  layout,
  classNames: ['tree-leaf'],
  classNameBindings: ['model.isSelected:tree-highlight'],

  click() {
    let model = this.get('model');
    let select = this.get('select');

    set(model, 'isSelected', !model.isSelected);
    select(model);
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
