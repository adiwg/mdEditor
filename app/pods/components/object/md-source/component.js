import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import {
  set,
  getWithDefault,
  get
} from '@ember/object';
import {
  once
} from '@ember/runloop';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import uuidV4 from "uuid/v4";

const Validations = buildValidations({
  'description': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

@classic
@tagName('form')
export default class MdSource extends Component.extend(Validations) {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'sourceId', getWithDefault(model, 'sourceId', uuidV4()));
      set(model, 'sourceCitation', getWithDefault(model,
        'sourceCitation', {}));
      set(model, 'metadataCitation', getWithDefault(model,
        'metadataCitation', []));
      set(model, 'spatialResolution', getWithDefault(model,
        'spatialResolution', {}));
      set(model, 'referenceSystem', getWithDefault(model,
        'referenceSystem', {}));
      set(model, 'referenceSystem.referenceSystemIdentifier',
        getWithDefault(model,
          'referenceSystem.referenceSystemIdentifier', {}));
      set(model, 'sourceProcessStep', getWithDefault(model,
        'sourceProcessStep', []));
      set(model, 'scope', getWithDefault(model, 'scope', {}));
    });
  }

  @alias('model.domainId')
  domainId;

  @alias('model.codeName')
  codeName;

  @alias('model.description')
  description;
}
