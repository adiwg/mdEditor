import Ember from 'ember';
import Input from '../md-input/component';

export default Input.extend({
  /**
   * Input, edit, display a single item
   *
   * @class md-input-confirm
   * @module mdeditor
   * @submodule components-input
   * @constructor
   */

  classNameBindings: ['required'],

  disabled: true,

  isDisabled: Ember.computed('disabled', function(){
    return this.get('disabled');
  }),

  didInsertElement() {
    this._super(...arguments);
    this.$('input')
      .on('blur', () => {
        this.set('disabled', true);
      });
  },

  actions: {
    allowEdit() {
      this.set('disabled', false);
      Ember.run.once(() => {
        this.$('input').focus();
      });
    }
  }
});
