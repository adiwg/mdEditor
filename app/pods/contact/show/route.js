import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    let rec= this.store.findRecord('contact', params.contact_id);
    return rec;
  }
});
