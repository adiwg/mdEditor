import Service, { inject as service } from '@ember/service';
import { A } from '@ember/array';
import EmberObject, { computed } from '@ember/object';
import classic from 'ember-classic-decorator';

@classic
export default class ContactsService extends Service {
  init() {
    super.init(...arguments);

    let store = this.store;

    this.set('contacts', store.peekAll('contact'));
  }

  @service store;

  contacts = A();

  @computed('contacts.[]')
  get organizations() {
    let orgs = this.contacts.filterBy('json.isOrganization');

    return orgs;
  }

  @computed('contacts.[]')
  get individuals() {
    let ind = this.contacts.rejectBy('json.isOrganization');

    return ind;
  }

  @computed('contactsCodes.[]')
  get organizationsCodes() {
    let orgs = this.contactsCodes.filterBy('icon', 'users');

    return orgs;
  }

  @computed('contactsCodes.[]')
  get individualsCodes() {
    let ind = this.contactsCodes.rejectBy('icon', 'users');

    return ind;
  }

  /**
   * mapped is a re-mapped array of code objects.
   *
   * @property mapped
   * @type {Array}
   * @category computed
   * @requires mdCodeName
   */
  @computed('contacts.@each.name', 'defaultIcon', 'icons')
  get contactsCodes() {
    //let codeId = this.get('valuePath');
    //let codeName = this.get('namePath');
    //let tooltip = this.get('tooltipPath');
    let codelist = [];
    let icons = this.icons;
    let defaultIcon = this.defaultIcon;
    let mdCodelist = this.contacts.sortBy('title');

    mdCodelist.forEach(function (item) {
      let newObject = EmberObject.create({
        codeId: item.get('contactId'),
        codeName: item.get('title'),
        tooltip: item.get('combinedName'),
        icon: item.get('icon') || icons.get(defaultIcon),
      });
      codelist.pushObject(newObject);
    });

    return codelist;
  }
}
