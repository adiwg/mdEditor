import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { once } from '@ember/runloop';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import { v4 as uuidV4 } from 'uuid';

const Validations = buildValidations({
  'description': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

@classic
export default class MdSourceComponent extends Component.extend(Validations) {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'sourceId', model.sourceId ?? uuidV4());
      set(model, 'sourceCitation', model.sourceCitation ?? {});
      set(model, 'metadataCitation', model.metadataCitation ?? []);
      set(model, 'spatialResolution', model.spatialResolution ?? {});
      set(model, 'referenceSystem', model.referenceSystem ?? {});
      set(model.referenceSystem, 'referenceSystemIdentifier',
        model.referenceSystem.referenceSystemIdentifier ?? {});
      set(model, 'sourceProcessStep', model.sourceProcessStep ?? []);
      set(model, 'scope', model.scope ?? {});
    });
  }

  /**
   * The string representing the path in the profile object for the domain.
   *
   * @property profilePath
   * @type {String}
   * @default 'false'
   * @required
   */

  /**
   * The object to use as the data model for the domain.
   *
   * @property model
   * @type {Object}
   * @required
   */

  tagName = 'form';

  @alias('model.domainId') domainId;
  @alias('model.codeName') codeName;
  @alias('model.description') description;
}
