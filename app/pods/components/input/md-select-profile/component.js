import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    update(value) {
      this.sendAction('updateProfile', value);
    }
  }
});
