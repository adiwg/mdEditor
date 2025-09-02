import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import EmberObject, { set, getWithDefault, get } from '@ember/object';
import {
  once
} from '@ember/runloop';

import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import {
  Template as Voucher
} from './voucher/component';

const Validations = buildValidations({
  'title': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'taxonomicSystem': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  // 'identificationProcedure': [
  //   validator('presence', {
  //     presence: true,
  //     ignoreBlank: true
  //   })
  // ],
  'taxonomicClassification': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

@classic
class TemplateClass extends EmberObject.extend(Validations) {
  init() {
    super.init(...arguments);

    set(this, 'taxonomicSystem', []);
    set(this, 'identificationReference', []);
    set(this, 'observer', []);
    set(this, 'voucher', []);
    set(this, 'taxonomicClassification', []);
  }
}

@classic
@tagName('form')
class theComp extends Component.extend(Validations) {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'taxonomicClassification', getWithDefault(model,
        'taxonomicClassification', []));
      set(model, 'taxonomicSystem', getWithDefault(model,
        'taxonomicSystem', []));
      set(model, 'identificationReference', getWithDefault(model,
        'identificationReference', []));
      set(model, 'observer', getWithDefault(model, 'observer', []));
      set(model, 'voucher', getWithDefault(model, 'voucher', []));
    });
  }

  voucherTemplate = Voucher;

  @alias('model.taxonomicSystem')
  taxonomicSystem;

  @alias('model.taxonomicSystem.firstObject.citation.title')
  title;

  @alias('model.identificationProcedure')
  identificationProcedure;

  @alias('model.taxonomicClassification')
  taxonomicClassification;

  systemTemplate = EmberObject.extend({
    init() {
      super.init(...arguments);
      this.set('citation', {});
    }
  });
}

export {
  Validations,
  TemplateClass as Template,
  theComp as
  default
};
