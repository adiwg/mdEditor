import Component from '@ember/component';
import {
  set,
  getWithDefault,
  get
} from '@ember/object';
import {
  alias
} from '@ember/object/computed';
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

export default Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'sourceId', (model.sourceId === undefined ? uuidV4() : model.sourceId));
      set(model, 'sourceCitation', (model.sourceCitation === undefined ? {} : model.sourceCitation));
      set(model, 'metadataCitation', (model.metadataCitation === undefined ? [] : model.metadataCitation));
      set(model, 'spatialResolution', (model.spatialResolution === undefined ? {} : model.spatialResolution));
      set(model, 'referenceSystem', (model.referenceSystem === undefined ? {} : model.referenceSystem));
      set(model, 'referenceSystem.referenceSystemIdentifier',
        (get(model, 'referenceSystem.referenceSystemIdentifier') === undefined ? {} : get(model, 'referenceSystem.referenceSystemIdentifier')));
      set(model, 'sourceProcessStep', (model.sourceProcessStep === undefined ? [] : model.sourceProcessStep));
      set(model, 'scope', (model.scope === undefined ? {} : model.scope));
    });
  },

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

  tagName: 'form',
  domainId: alias('model.domainId'),
  codeName: alias('model.codeName'),
  description: alias('model.description')
});
