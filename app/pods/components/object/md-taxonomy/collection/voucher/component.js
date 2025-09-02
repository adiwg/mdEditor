import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';
import EmberObject, { getWithDefault, set } from '@ember/object';
import Component from '@ember/component';
import { once } from '@ember/runloop';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'specimen': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'repository': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

@classic
class Template extends EmberObject.extend(Validations) {
  init() {
    super.init(...arguments);
    this.set('repository', {});
    this.set('specimen', null);
  }
}

@classic
@classNames('form')
class theComp extends Component.extend(Validations) {
  @alias('model.specimen')
  specimen;

  @alias('model.repository')
  repository;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'repository', getWithDefault(model, 'repository', {}));
      set(model, 'specimen', getWithDefault(model, 'specimen', null));
    });
  }

  //attributeBindings: ['data-spy'],
  templateClass = Template;
}

export {
  Validations,
  Template,
  theComp as
  default
};
