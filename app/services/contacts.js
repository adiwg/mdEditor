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

    let store = this.get('store');

    this.set('contacts', store.peekAll('contact'));
  },

  store: inject.service(),

  contacts: A(),

  organizations: computed('contacts.[]', function() {
    let orgs = this.get('contacts').filterBy('json.isOrganization');

    return orgs;
  })
});
