import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

/**
 * mdEditor Component that accepts a contact identifier and returns the
 * formatted link element.
 *
 * @class md-contact-link
 * @module mdeditor
 * @submodule components-control
 */
export default class MdContactLinkComponent extends Component {
  @service store;

  /**
   * The contact record looked up by contactId
   */
  get contact() {
    return this.store
      .peekAll('contact')
      .find((c) => c.json?.contactId === this.args.contactId);
  }

  /**
   * The contact's display title
   */
  get title() {
    return this.contact?.title || this.args.contactId || 'Unknown Contact';
  }

  /**
   * The contact's record ID for routing
   */
  get contactRecordId() {
    return this.contact?.id;
  }
}
