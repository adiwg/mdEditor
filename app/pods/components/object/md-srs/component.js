import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
import { set } from '@ember/object';
import { once } from '@ember/runloop';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  refType: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      disabled: alias(
        'model.model.referenceSystemIdentifier.identifier'
      ).readOnly(),
    }),
  ],
  refSystem: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      disabled: alias('model.model.referenceSystemType').readOnly(),
    }),
  ],
});

@classic
export default class MdSrsComponent extends Component.extend(Validations) {
  classNames = ['form'];

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    if (model) {
      once(this, function () {
        if (!model.referenceSystemIdentifier) {
          set(model, 'referenceSystemIdentifier', {});
        }
      });
    }
  }

  init() {
    super.init(...arguments);

    let model = this.model;
    if (model && !model.referenceSystemIdentifier) {
      set(model, 'referenceSystemIdentifier', {});
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

}

MdSrsComponent.reopen({
  refSystem: alias('model.referenceSystemIdentifier.identifier'),
  refType: alias('model.referenceSystemType'),
});
