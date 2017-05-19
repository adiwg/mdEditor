import Ember from 'ember';

export default Ember.Component.extend({
  actionContext: Ember.computed('context', function () {
    return this.get('context')();
  })
});
