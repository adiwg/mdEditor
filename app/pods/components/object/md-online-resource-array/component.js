import Ember from 'ember';

export default Ember.Component.extend({
  items2: Ember.computed('model', function() {
    if (this.get('model.' + this.get('propertyArrayName')) === undefined) {
      this.set('model.' + this.get('propertyArrayName'), []);
    }
    return this.get('model.' + this.get('propertyArrayName'));
  })
});
