import Ember from 'ember';

export default Ember.Route.extend({
  redirect: function() {
    let rec = this.store.createRecord('dictionary');

    this.replaceWith('dictionary.new.id', rec);
  }
});
