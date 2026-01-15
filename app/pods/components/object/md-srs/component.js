import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
import { once } from '@ember/runloop';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'refType': [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      disabled: alias('model.model.referenceSystemIdentifier.identifier').readOnly()
    })
  ],
  'refSystem': [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      disabled: alias('model.model.referenceSystemType').readOnly()
    })
  ]
});

@classic
export default class MdSrsComponent extends Component.extend(Validations) {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    if(model){
      once(this, function() {
        model.referenceSystemIdentifier = model.referenceSystemIdentifier ?? {};
      });
    }
  }

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

  classNames = ['form'];

  @alias('model.referenceSystemIdentifier.identifier') refSystem;
  @alias('model.referenceSystemType') refType;
}
