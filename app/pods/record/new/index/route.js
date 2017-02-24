import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'New',
    linkable: false
  },
  redirect: function() {
    let rec = this.store.createRecord('record');
		this.transitionTo('record.new.id', rec);
	}
});
