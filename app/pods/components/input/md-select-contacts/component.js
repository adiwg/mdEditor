import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Select from '../md-codelist-multi/component';

@classic
@classNames('md-select-contact')
export default class MdSelectContacts extends Select {
 /**
  * Specialized select list control for displaying and selecting
  * contacts.
  *
  * @class md-select-contacts
  * @constructor
  * @extends md-select
  */

 /**
  * The contacts service
  *
  * @property contacts
  * @type {Ember.Service}
  * @readOnly
  */
 @service
 contacts;

 /**
  * The default codelist name. Should not be overridden.
  *
  * @property classNames
  * @protected
  * @type {String}
  * @default 'contacts'
  * @readOnly
  */
 mdCodeName = 'contacts';

 /**
  * The property that holds the select item value. Should not be overridden.
  *
  * @property valuePath
  * @protected
  * @type {String}
  * @default 'valuePath'
  * @readOnly
  */
 valuePath = 'contactId';

 /**
  * The property that holds the select item text. Should not be overridden.
  *
  * @property namePath
  * @protected
  * @type {String}
  * @default 'namePath'
  * @readOnly
  */
 namePath = 'title';

 /**
  * The contact type to display in the list. Choices are `organizations` or
  * `individuals` or 'contacts'. Passing any other value will default to
  * 'contacts'.
  *
  * @property contactType
  * @protected
  * @type {String}
  * @default 'contacts'
  */
 contactType = 'contacts';

 /**
  * The contact list mapped from the store to a codelist.
  *
  * @property mapped
  * @type {Array}
  * @category computed
  * @requires contacts.[]
  */
 @computed('contacts.mapped.[]', 'contactType')
 get mapped() {
   let type = this.contactType;

   if(!['individuals','organizations'].includes(type)){
     return this.contacts.get('contactsCodes');
   }

   return this.contacts
     .get(type + 'Codes');
 }
}
