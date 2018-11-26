import { inject as service } from '@ember/service';
import LinkComponent from '@ember/routing/link-component';
import { set, get, computed } from '@ember/object';

export default LinkComponent.extend({
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
    let block = !this.get('block') ? [this.get('contact.title')] : [];
    let params = get(this, 'params');
    let add = block.concat(['contact.show', this.get('contact.id')]);


    set(this, 'params', params? add.concat(params) : add);
    this._super(...arguments);
  },

  store: service(),

  /**
   * The contacts service
   *
   * @property contacts
   * @type {Ember.Service}
   * @readOnly
   */
  contacts: service(),

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
  contact: computed('contactId', function () {
      let rec = this.get('store')
        .peekAll('contact')
        .findBy('json.contactId', this.get('contactId'));

      return rec;
    })
    .readOnly()
});
