import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import EmObject from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

// const Validations = buildValidations({
//   'type': [
//     validator('presence', {
//       presence: true,
//       ignoreBlank: true
//     })
//   ]
// });

/**
 * mdEditor class for input and edit of mdJSON 'phone' object.
 * The class manages the maintenance of an array of phone objects.
 *
 * @class md-phone-array
 * @module mdeditor
 * @submodule components-object
 * @constructor
 */
@classic
export default class MdResourceTypeArrayComponent extends Component {
  attributeBindings = ['dataSpy:data-spy'];

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass = EmObject.extend({
    init() {
      this._super(...arguments);
    },
  });
}
