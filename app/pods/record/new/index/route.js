import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'New',
    linkable: false
  },
  redirect: function() {
		this.replaceWith('record.new.id', '');
	}
});
