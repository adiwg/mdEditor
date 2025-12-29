import classic from 'ember-classic-decorator';
import { attributeBindings } from '@ember-decorators/component';
import Component from '@ember/component';
import EmObject from '@ember/object';
import { A } from '@ember/array';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  phoneNumber: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
    validator('format', {
      type: 'phone',
      isWarning: true,
      message: 'This field should be a valid phone number.',
    }),
  ],
});

@classic
@attributeBindings('data-spy')
export default class MdPhoneArray extends Component {
  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass =
    (
      @classic
      class MdPhoneArray extends (
        @classic
        class MdPhoneArray extends EmObject.extend(Validations) {}
      ) {
        init() {
          undefined;
          this.set('service', A());
        }
      }
    );
}
