import Ember from 'ember';

export default Ember.Route.extend({
  redirect() {
    let rec = this.store.createRecord('record');

    this.replaceWith('record.new.id', rec);
  }
});
