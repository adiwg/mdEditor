import classic from 'ember-classic-decorator';
import { attributeBindings, classNames } from '@ember-decorators/component';
import { and, alias } from '@ember/object/computed';
import Component from '@ember/component';
import { getWithDefault, set } from '@ember/object';
import {
  once
} from '@ember/runloop';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'identifier': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

@classic
@classNames('md-identifier')
@attributeBindings('data-spy')
class theComp extends Component.extend(Validations) {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = getWithDefault(this, 'model', {}) || {};

    once(this, function () {
      set(model, 'authority', getWithDefault(model, 'authority',
        {}));
    });
  }

  /**
   * The identifier object to render
   *
   * @property model
   * @type {object}
   * @required
   */

  /**
   * Render short form of the identifier template, i.e. no authority
   *
   * @property short
   * @type {Boolean}
   */

  /**
   * Determines whether to render identifier field with confirmation button
   *
   * @property confirmIdentifier
   * @type {Boolean}
   */

  @alias('model.identifier')
  identifier;

  collapsible = false;
  collapse = true;

  @and('collapsible', 'collapse')
  isCollapsed;
}

export {
  Validations,
  theComp as
  default
};
