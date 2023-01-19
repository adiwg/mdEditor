import Service, { inject as service } from '@ember/service';
import { A } from '@ember/array';
import EmberObject, { computed } from '@ember/object';

export default Service.extend({
  init() {
    this._super(...arguments);

    let store = this.store;

    this.set('contacts', store.peekAll('contact'));
  },

  store: service(),

  contacts: A(),

  organizations: computed('contacts.[]', function() {
    let orgs = this.contacts.filterBy('json.isOrganization');

    return orgs;
  }),

  individuals: computed('contacts.[]', function() {
    let ind = this.contacts.rejectBy('json.isOrganization');

    return ind;
  }),

  organizationsCodes: computed('contactsCodes.[]', function() {
    let orgs = this.contactsCodes.filterBy('icon','users');

    return orgs;
  }),

  individualsCodes: computed('contactsCodes.[]', function() {
    let ind = this.contactsCodes.rejectBy('icon','users');

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
  contactsCodes: computed('contacts.@each.name', function() {
    //let codeId = this.get('valuePath');
    //let codeName = this.get('namePath');
    //let tooltip = this.get('tooltipPath');
    let codelist = [];
    let icons = this.icons;
    let defaultIcon = this.defaultIcon;
    let mdCodelist = this.contacts.sortBy('title');

    mdCodelist.forEach(function(item) {
      let newObject = EmberObject.create({
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
