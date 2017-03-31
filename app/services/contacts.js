import Ember from 'ember';

const {
  Service,
  inject,
  A,
  computed
} = Ember;

export default Service.extend({
  init() {
    this._super(...arguments);

    let me = this;
    let store = this.get('store');

    let results = store.peekAll('contact');
    me.set('contacts', results);
  },

  store: inject.service(),

  contacts: A(),

  organizations: computed('contacts.[]', function() {
    let orgs = this.get('contacts').filterBy('json.isOrganization');

    return orgs;
  })
});
