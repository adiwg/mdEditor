/**
 * @module mdeditor
 * @submodule components-input
 */

import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import classic from 'ember-classic-decorator';
import MdCodelistMulti from '../md-codelist-multi/component';

/**
 * Specialized select list control for displaying and selecting multiple
 * contacts.
 *
 * @class md-select-contacts
 * @extends md-codelist-multi
 */
@classic
class MdSelectContactsComponent extends MdCodelistMulti {
  mdCodeName = 'contacts';

  valuePath = 'contactId';

  namePath = 'title';

  contactType = 'contacts';
}

MdSelectContactsComponent.reopen({
  contacts: service(),

  mapped: computed('contacts.mapped.[]', 'contactType', function () {
    let type = this.contactType;

    if (!['individuals', 'organizations'].includes(type)) {
      return this.contacts.get('contactsCodes');
    }

    return this.contacts.get(type + 'Codes');
  }),
});

MdSelectContactsComponent.prototype.classNames = [
  ...MdCodelistMulti.prototype.classNames,
  'md-select-contact',
];

export default MdSelectContactsComponent;
