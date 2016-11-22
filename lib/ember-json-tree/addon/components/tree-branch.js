import Ember from 'ember';
import layout from '../templates/components/tree-branch';

const {
  Component
} = Ember;

export default Component.extend({
  layout,
  tagName: 'li',
  classNames: ['tree-branch list-group-item']
});
