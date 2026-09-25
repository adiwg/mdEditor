/**
 * @module mdeditor
 * @submodule components-input
 */

import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import classic from 'ember-classic-decorator';
import MdCodelist from '../md-codelist/component';

/**
 * Specialized select list control for displaying and selecting a contact.
 *
 * @class md-select-contact
 * @extends md-codelist
 */
@classic
class MdSelectContactComponent extends MdCodelist {
  mdCodeName = 'contacts';

  valuePath = 'contactId';

  namePath = 'title';

  contactType = 'contacts';
}

MdSelectContactComponent.reopen({
  contacts: service(),

  mapped: computed('contacts.mapped.[]', 'contactType', function () {
    let type = this.contactType;

    if (!['individuals', 'organizations'].includes(type)) {
      return this.contacts.get('contactsCodes');
    }

    return this.contacts.get(type + 'Codes');
  }),
});

MdSelectContactComponent.prototype.classNames = [
  ...MdCodelist.prototype.classNames,
  'md-select-contact',
];

export default MdSelectContactComponent;
