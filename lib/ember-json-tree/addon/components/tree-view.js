import Ember from 'ember';
import layout from '../templates/components/tree-view';

const {
  Component
} = Ember;

export default Component.extend({
  layout,
  tagName: 'ul',
  classNames: ['tree-trunk'],

  select(model) {
    return model;
  }
});
