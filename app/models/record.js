import { alias } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import EmberObject, { computed } from '@ember/object';
import { getWithDefault } from '@ember/object';
import { Copyable } from 'ember-copy';
import DS from 'ember-data';
import uuidV4 from "uuid/v4";
import Model from 'mdeditor/models/base';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import config from 'mdeditor/config/environment';

const {
  APP: {
    defaultProfileId
  }
} = config;

const Validations = buildValidations({
  'recordId': validator(
    'presence', {
      presence: true,
      ignoreBlank: true,
    }),
  'json.metadata.resourceInfo.resourceType': [
    validator('array-valid'),
    validator('array-required', {
      track: ['type']
    })
  ],
  'json.metadata.resourceInfo.pointOfContact': {
    disabled: alias('model.isNew'),
    validators: [
      validator('array-valid'),
      validator('array-required', {
        track: ['type']
      })
    ]
  },
  // 'json.resourceInfo.abstract': validator('presence', {
  //   presence: true,
  //   ignoreBlank: true
  // }),
  'json.metadata.resourceInfo.citation.title': validator('presence', {
    presence: true,
    ignoreBlank: true
  })
  // 'json.metadata.resourceInfo.citation': validator('length', {
  //   min: 1
  // }),
  // 'json.metadata.resourceInfo.status': validator('length', {
  //   min: 1
  // }),
  // 'json.metadata.resourceInfo.pointOfContact': validator('length', {
  //   min: 1
  // }),
  // 'json.metadata.resourceInfo.defaultResourceLocale': validator('length', {
  //   min: 1
  // })
});

const Record = Model.extend(Validations, Copyable, {
  /**
   * Record(metadata) model
   *
   * @class record
   * @constructor
   * @extends base
   * @module mdeditor
   * @submodule data-models
   */

  profile: DS.attr('string', {
    defaultValue: defaultProfileId
  }),
  json: DS.attr('json', {
    defaultValue() {
      const obj = EmberObject.create({
        schema: {
          name: 'mdJson',
          version: '2.6.0'
        },
        contact: [],
        metadata: {
          metadataInfo: {
            metadataIdentifier: {
              identifier: uuidV4(),
              namespace: 'urn:uuid'
            },
            metadataContact: [],
            defaultMetadataLocale: {}
          },
          resourceInfo: {
            resourceType: [{}],
            citation: {
              title: null,
              date: []
            },
            pointOfContact: [],
            abstract: '',
            shortAbstract: '',
            status: [],
            defaultResourceLocale: {
              // characterSet: UTF-8,
              // country: USA,
              // language: eng
            },
            timePeriod: {
              periodName: []
            },
            extent: [],
            keyword: []
          },
          dataQuality: []
        },
        metadataRepository: [],
        dataDictionary: []
      });

      return obj;
    }
  }),
  dateUpdated: DS.attr('date', {
    defaultValue() {
      return new Date();
    }
  }),

  title: alias('json.metadata.resourceInfo.citation.title'),

  icon: computed('json.metadata.resourceInfo.resourceType.firstObject.type',
    function () {
      const type = this.get(
          'json.metadata.resourceInfo.resourceType.0.type') ||
        '';
      const list = getOwner(this).lookup('service:icon');

      return type ? list.get(type) || list.get('default') : list.get(
        'defaultFile');
    }),

  recordId: alias(
    'json.metadata.metadataInfo.metadataIdentifier.identifier'),
  recordIdNamespace: alias(
    'json.metadata.metadataInfo.metadataIdentifier.namespace'),

  parentIds: alias(
    'json.metadata.metadataInfo.parentMetadata.identifier'),

  hasParent: computed('parentIds.[]', function () {
    let ids = this.parentIds;
    let allRecords = this.store.peekAll('record');
    let records = allRecords.rejectBy('hasSchemaErrors');

    if(!ids) {
      return false;
    }

    return ids.find((id) => {
      return records.findBy('recordId', id.identifier) ? true :
        false;
    });
  }),

  defaultParent: computed('hasParent', function () {
    let id = this.get('hasParent.identifier');
    let allRecords = this.store.peekAll('record');

    if(!id) {
      return undefined;
    }

    return allRecords.findBy('recordId', id);
  }),

  defaultType: alias(
    'json.metadata.resourceInfo.resourceType.firstObject.type'),

  /**
   * The trimmed varsion of the recordId.
   *
   * @property shortId
   * @type {String}
   * @readOnly
   * @category computed
   * @requires recordId
   */
  shortId: computed('recordId', function () {
    const recordId = this.recordId;
    if(recordId) {
      let index = recordId.indexOf('-');

      return recordId.substring(0, index > -1 ? index : 8);
    }

    return recordId;
  }),

  /**
   * A list of schema errors return by the validator.
   *
   * @property hasSchemaErrors
   * @type {Array}
   * @readOnly
   * @category computed
   * @requires status
   */
  schemaErrors: computed('hasDirtyHash', 'customSchemas.[]', function () {
    let mdjson = this.mdjson;
    let errors = [];
    let result = mdjson.validateRecord(this).errors;

    if(result) {
      errors.pushObject({
        title: 'Default Record Validation',
        errors: result
      });
    }

    this.customSchemas.forEach(schema => {
      const validator = schema.validator;

      if(!validator) {
        return;
      }

      if(validator.validate(schema.rootSchema, mdjson.formatRecord(
          this))) {
        return;
      }

      errors.pushObject({
        title: schema.title,
        errors: validator.errors
      });
    });

    return errors;
  }),

  formatted: alias('_formatted'),

  copy() {
    let current = this.cleanJson;
    let json = EmberObject.create(current);
    let name = current.metadata.resourceInfo.citation.title;

    json.set('metadata.resourceInfo.citation.title', `Copy of ${name}`);
    json.set('metadata.resourceInfo.resourceType', getWithDefault(json,
      'metadata.resourceInfo.resourceType', [{}]));
    json.set('metadata.metadataInfo.metadataIdentifier', {
      identifier: uuidV4(),
      namespace: 'urn:uuid'
    });

    return this.store.createRecord('record', {
      json: json
    });
  }
});

Object.defineProperty(Record.prototype, '_formatted', {
  get() {
    return this.mdjson.formatRecord(this);
  }
});

export default Record;
