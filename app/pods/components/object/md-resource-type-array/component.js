import classic from 'ember-classic-decorator';
import { attributeBindings } from '@ember-decorators/component';
import Component from '@ember/component';
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

@classic
@attributeBindings('data-spy')
export default class MdResourceTypeArray extends Component {
  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass =
    (
      @classic
      class MdResourceTypeArray extends EmObject {
        init() {
          undefined;
        }
      }
    );
}
