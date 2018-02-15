import Ember from 'ember';

const {
  Component,
  computed,
  inject
} = Ember;

export default Component.extend({
  tagName: '',

  store: inject.service(),

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
      let rec = this.get('store')
        .peekAll('contact')
        .findBy('json.contactId', this.get('contactId'));

      return rec;
    })
    .readOnly()
});
