import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
import { once } from '@ember/runloop';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'amount': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'currency': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

@classic
export default class MdAllocationComponent extends Component.extend(Validations) {
  /**
   * The string representing the path in the profile object for the resource.
   *
   * @property profilePath
   * @type {String}
   * @default 'false'
   * @required
   */

  /**
   * The object to use as the data model for the resource.
   *
   * @property model
   * @type {Object}
   * @required
   */

  attributeBindings = ['data-spy'];
  'data-spy' = 'Allocation';
  tagName = 'form';

  @alias('model.amount') amount;
  @alias('model.currency') currency;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function() {
      model.currency = model.currency ?? 'USD';
      model.onlineResource = model.onlineResource ?? [];
      model.responsibleParty = model.responsibleParty ?? [];
    });
  }
}
