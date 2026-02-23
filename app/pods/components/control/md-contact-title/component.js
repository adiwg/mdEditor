import { inject as service } from '@ember/service';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';

/**
 * mdEditor Component that accepts a contact identifier and returns the
 * contact title or yields the contact in block form.
 *
 * @class md-contact-title
 * @module mdeditor
 * @submodule components-control
 * @constructor
 */
@classic
export default class MdContactTitleComponent extends Component {
  tagName = '';

  @service store;

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
  get contact() {
    let rec = this.store.peekAll('contact').find((item) => {
      let json =
        item && typeof item.get === 'function' ? item.get('json') : item.json;
      let id =
        json &&
        (json && typeof json.get === 'function'
          ? json.get('contactId')
          : json.contactId);
      return id === this.contactId;
    });

    return rec;
  }
}
