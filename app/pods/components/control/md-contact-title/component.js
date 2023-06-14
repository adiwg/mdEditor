import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  store: service(),

  /**
   * mdEditor Component that accepts a contact identifier and returns the
   * contact title or yields the contact in block form.
   *
   * @class md-contact-title
   * @module mdeditor
   * @submodule components-control
   * @constructor
   */

  /**
   * The contact identifier
   *
   * @property contactId
   * @type {String}
   * @required
   */
  /**
   * description
   *
   * @property contact
   * @type {String}
   * @readOnly
   * @category computed
   * @requires contactId
   */
  contact: computed('contactId', function () {
    let rec = this.store
      .peekAll('contact')
      .findBy('json.contactId', this.contactId);

    return rec;
  }).readOnly(),
});
