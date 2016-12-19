import Ember from 'ember';

export default Ember.Component.extend({
  disabled: Ember.computed('model.thesaurus.identifier.0.identifier', function() {
    return this.get('model.thesaurus.identifier.0.identifier') !== 'custom';
  })
});
