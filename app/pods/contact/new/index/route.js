import Ember from 'ember';

export default Ember.Route.extend({
  redirect: function() {
    let rec = this.store.createRecord('contact');

		this.replaceWith('contact.new.id', rec);
	}
});
