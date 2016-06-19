import Ember from 'ember';

export default Ember.Component.extend({
  panelId: Ember.computed(function() {
    return Ember.generateGuid(null, 'panel');
  })
});
