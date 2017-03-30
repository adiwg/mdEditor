import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  organizations: [],
  init() {
    this._super(...arguments);

    let me = this;
    let store = this.get('store');

    store.findAll('contact').then(function(results) {
      me.set('organizations', results.filterBy('json.isOrganization'));
    });
  }
});
