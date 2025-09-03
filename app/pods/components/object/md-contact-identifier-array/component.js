import classic from 'ember-classic-decorator';
import { attributeBindings } from '@ember-decorators/component';
import Component from '@ember/component';
import EmObject, { set } from '@ember/object';
import { A } from '@ember/array';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  identifier: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
  namespace: [
    validator('presence', {
      presence: true,
    }),
  ],
});

@classic
@attributeBindings('data-spy')
export default class MdContactIdentifierArray extends Component {
  init() {
    super.init(...arguments);

    if (!this.value) {
      this.value = [];
    }
  }

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass =
    (
      @classic
      class MdContactIdentifierArray extends EmObject.extend(Validations) {
        init() {
          super.init(...arguments);
          this.set('service', A());
        }
      }
    );
}
