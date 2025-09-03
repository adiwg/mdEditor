import classic from 'ember-classic-decorator';
import { attributeBindings } from '@ember-decorators/component';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import Component from '@ember/component';
import { Validations } from '../md-identifier/component';

@classic
@attributeBindings('data-spy')
export default class MdIdentifierArray extends Component {
  init() {
    super.init(...arguments);

    if (!this.model) {
      this.set('model', A());
    }
  }

  /**
   * mdJSON object containing the 'identifier' array.
   *
   * @property model
   * @type Object
   * @required
   */

  /**
   * List of mdJSON 'identifier' object attributes to display in
   * md-object-table to aid in choosing the identifier to edit or
   * delete.
   * The property is passed to md-object-table for configuration.
   *
   * @property attributes
   * @type String
   * @default 'name, uri'
   */
  attributes = 'identifier,namespace,description';

  /**
   * Name to place on the mdEditor panel header for entry and edit of
   * 'identifier' objects.
   * The property is passed to md-object-table for configuration.
   *
   * @property label
   * @type String
   * @default 'Identifier'
   */
  label = 'Identifier';

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass =
    (
      @classic
      class MdIdentifierArray extends EmberObject.extend(Validations) {
        init() {
          super.init(...arguments);
          this.set('authority', {});
        }
      }
    );
}
