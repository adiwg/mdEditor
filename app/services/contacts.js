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
  }),

  individuals: computed('contacts.[]', function() {
    let ind = this.get('contacts').rejectBy('json.isOrganization');

    return ind;
  }),

  organizationsCodes: computed('contactsCodes.[]', function() {
    let orgs = this.get('contactsCodes').filterBy('icon','users');

    return orgs;
  }),

  individualsCodes: computed('contactsCodes.[]', function() {
    let ind = this.get('contactsCodes').rejectBy('icon','users');

    return ind;
  }),

  /**
   * mapped is a re-mapped array of code objects.
   *
   * @property mapped
   * @type {Array}
   * @category computed
   * @requires mdCodeName
   */
  contactsCodes: Ember.computed('contacts.@each.name', function() {
    //let codeId = this.get('valuePath');
    //let codeName = this.get('namePath');
    //let tooltip = this.get('tooltipPath');
    let codelist = [];
    let icons = this.get('icons');
    let defaultIcon = this.get('defaultIcon');
    let mdCodelist = this.get('contacts').sortBy('title');

    mdCodelist.forEach(function(item) {
      let newObject = Ember.Object.create({
        codeId: item.get('contactId'),
        codeName: item.get('title'),
        tooltip: item.get('combinedName'),
        icon: item.get('icon') || icons.get(defaultIcon)
      });
      codelist.pushObject(newObject);
    });

    return codelist;
  })
});
