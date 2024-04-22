import Component from '@ember/component';
import { set, get } from '@ember/object';
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
      set(model, 'sourceId', get(model, 'sourceId') !== undefined ? get(model, 'sourceId') : uuidV4());
      set(model, 'sourceCitation', get(model, 'sourceCitation') !== undefined ? get(model, 'sourceCitation') : {});
      set(model, 'metadataCitation', get(model, 'metadataCitation') !== undefined ? get(model, 'metadataCitation') : []);
      set(model, 'spatialResolution', get(model, 'spatialResolution') !== undefined ? get(model, 'spatialResolution') : {});
      set(model, 'referenceSystem', get(model, 'referenceSystem') !== undefined ? get(model, 'referenceSystem') : {});
      set(model, 'referenceSystem.referenceSystemIdentifier',
        get(model, 'referenceSystem.referenceSystemIdentifier') !== undefined ? get(model, 'referenceSystem.referenceSystemIdentifier') : {});
      set(model, 'sourceProcessStep', get(model, 'sourceProcessStep') !== undefined ? get(model, 'sourceProcessStep') : []);
      set(model, 'scope', get(model, 'scope') !== undefined ? get(model, 'scope') : {});
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
