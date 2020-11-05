import Component from '@ember/component';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';
import { get, set, getWithDefault } from '@ember/object';
import { ucWords } from 'mdeditor/helpers/uc-words';
import { decamelize } from '@ember/string';
import Attribute from 'mdjson-schemas/resources/js/attribute';
import { validator, buildValidations } from "ember-cp-validations";

const Validations = buildValidations({
  'attrIdentifier': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

const params = {
  sequenceIdentifier: 'string',
  sequenceIdentifierType: 'string',
  minValue: 'number',
  maxValue: 'number',
  units: 'string',
  scaleFactor: 'number',
  offset: 'number',
  meanValue: 'number',
  numberOfValues: 'number',
  standardDeviation: 'number',
  bitsPerValue: 'number',
  boundMin: 'number',
  boundMax: 'number',
  boundUnits: 'number',
  peakResponse: 'number',
  toneGradations: 'number',
  nominalSpatialResolution: 'number',
};

export default Component.extend(Validations, {
  /**
   * mdEditor class for input and edit of mdJson 'coverageDescription.attributeGroup.attribute' object
   * The class manages the maintenance of an array of 'attribute' ojbects.
   *
   * ```handlebars
   * \{{object/md-raster/attrgroup/attribute
   *    model=model.attribute
   *    profilePath="path"
   * }}
   * ```
   *
   * @module mdeditor
   * @submodule components-object-md-raster-attrgroup
   * @constructor
   * @class md-raster-attrgroup-attribute
   */

  init() {
    this.params = Object.keys(params).map(p => {
      return {
        property: p,
        label: ucWords([decamelize(p).replace(/_/g,
          ' ')], {
          force: false
        }),
        type: params[p],
        description: get(Attribute, `properties.${p}.description`)
      };
    });

    this._super(...arguments);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let model = getWithDefault(this, 'model', []) || [];

    once(this, function () {
      set(model, 'attributeIdentifier', getWithDefault(model,
        'attributeIdentifier', []));
      set(model, 'bandBoundaryDefinition', getWithDefault(model,
      'bandBoundaryDefinition', []));
      set(model, 'transferFunctionType', getWithDefault(model,
        'transferFunctionType', []));
      set(model, 'transmittedPolarization', getWithDefault(model,
        'transmittedPolarization', []));
      set(model, 'detectedPolarization', getWithDefault(model,
        'detectedPolarization', []));
    });
  },

  tagName: 'form',

  /**
   * 'attrIdentifier' is the alias for 'attributeIdentifier.identifier' used in the validations for the
   * 'attributeIdentifier' object.
   *
   * @property attrIdentifier
   * @type String
   * @requires alias
   * @default "alias('model.attributeIdentifier.identifier')"
   */
  attrIdentifier: alias('model.attributeIdentifier.identifier'),

  /**
   * 'attrDesc' is the alias for 'attributeDescription' used in the validations for the
   * 'attribute' object.
   *
   * @property attrDesc
   * @type String
   * @requires alias
   * @default "alias('model.attributeDescription')"
   */
  attrDesc: alias('model.attriuteDescription'),
});
