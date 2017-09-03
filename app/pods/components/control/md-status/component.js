import Ember from 'ember';
const {
  Component
} = Ember;

export default Component.extend({
  tagName: 'span',
  classNames: ['md-status'],

  /**
   * Model to display status for.
   *
   * @property model
   * @type {DS.model}
   * @required
   */
});
