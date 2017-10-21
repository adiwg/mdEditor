import Ember from 'ember';
import layout from '../templates/components/sb-tree-label';

const { Component } = Ember;

export default Component.extend({
  layout,
  tagName: 'span',
  classNames: ['tree-cell'],
  actions: {
    clicked(event){
      event.stopPropagation();

      window.open(event.currentTarget.href,'ScienceBaseItem');
      return false;
    }
  }
});
