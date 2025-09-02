import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import LinkComponent from '@ember/routing/link-component';
import { set, get, computed } from '@ember/object';

@classic
export default class MdContactLink extends LinkComponent {
 /**
  * mdEditor Component that accepts a contact identifier and returns the
  * formatted link element.
  *
  * @class md-contact-link
  * @module mdeditor
  * @submodule components-control
  * @constructor
  */

 didReceiveAttrs() {
   //Inline link title comes first, if present.
   let block = !this.block ? [this.get('contact.title')] : [];
   let params = this.params;
   let add = block.concat(['contact.show', this.get('contact.id')]);


   set(this, 'params', params? add.concat(params) : add);
   super.didReceiveAttrs(...arguments);
 }

 @service
 store;

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
  * The contact identifier
  *
  * @property contactId
  * @type {String}
  * @required
  */

 /**
  * Render as block
  *
  * @property block
  * @type {Boolean}
  * @required
  */

 /**
  * The contact record
  *
  * @property contact
  * @type {String}
  * @readOnly
  * @category computed
  * @requires contactId
  */
 @(computed('contactId').readOnly())
 get contact() {
     let rec = this.store
       .peekAll('contact')
       .findBy('json.contactId', this.contactId);

     return rec;
   }
}
