import EmberObject from '@ember/object';
import { A } from '@ember/array';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

@classic
export default class MdCitationArrayComponent extends Component {
  @service router;

  init() {
    super.init(...arguments);

    if (!this.model) {
      this.model = A();
    }
  }

  /**
   * mdJSON object containing the 'citation' array.
   *
   * @property model
   * @type Object
   * @required
   */

  /**
   * List of mdJSON 'citation' object attributes to display in
   * md-object-table to aid in choosing the citation to edit or
   * delete.
   * The property is passed to md-object-table for configuration.
   *
   * @property attributes
   * @type String
   * @default 'title'
   */
  attributes = 'title';

  /**
   * Name to place on the mdEditor panel header for entry and edit of
   * 'citation' objects.
   * The property is passed to md-object-table for configuration.
   *
   * @property label
   * @type String
   * @default 'Citation'
   */
  label = 'Citation';

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass = EmberObject.extend({
    init() {
      this._super(...arguments);
      //this.set('authority', {});
    },
  });

  @action
  handleEditItem(index) {
    if (this.itemRoute) {
      this.router.transitionTo(this.itemRoute, index);
      return;
    }

    if (this.editItem && typeof this.editItem === 'function') {
      this.editItem(index);
    }
  }
}
