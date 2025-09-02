import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import EmberObject, { set, getWithDefault, get, computed } from '@ember/object';
import {
  once
} from '@ember/runloop';

import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'codeName': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'dataType': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'allowNull': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'definition': [
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

    set(this, 'allowNull', true);
    set(this, 'attributeReference', {});
    set(this, 'alias', []);
    set(this, 'valueRange', []);
    set(this, 'timePeriod', []);
  }
}

@classic
@tagName('form')
class theComp extends Component.extend(Validations) {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'allowNull', getWithDefault(model, 'allowNull', false));
      set(model, 'reference', getWithDefault(model, 'reference', {}));
      set(model, 'alias', getWithDefault(model, 'alias', []));
      set(model, 'valueRange', getWithDefault(model, 'valueRange', []));
      set(model, 'timePeriod', getWithDefault(model, 'timePeriod', []));
    });
  }

  @alias('model.codeName')
  codeName;

  @alias('model.dataType')
  dataType;

  @alias('model.definition')
  definition;

  @alias('model.allowNull')
  allowNull;

  @alias('dictionary.domain')
  domains;

  @computed('domains.{@each.domainId,@each.codeName}')
  get domainList() {
    let domains = this.domains || [];

    return domains.map((domain) => {
      if(get(domain, 'domainId')) {
        return {
          codeId: get(domain, 'domainId'),
          codeName: get(domain, 'codeName'),
          tooltip: get(domain, 'description')
        };
      }
    });
  }

  rangeTemplate = EmberObject.extend(buildValidations({
    'minRangeValue': [
      validator('presence', {
        presence: true,
        ignoreBlank: true
      })
    ],
    'maxRangeValue': [
      validator('presence', {
        presence: true,
        ignoreBlank: true
      })
    ]
  }), {
    init() {
      this._super(...arguments);
    }
  });
}

export {
  Validations,
  TemplateClass as Template,
  theComp as
  default
};
