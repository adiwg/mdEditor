import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
import { attr, belongsTo } from '@ember-data/model';
import { getOwner } from '@ember/application';
import EmberObject, { getWithDefault, computed } from '@ember/object';
import Copyable from 'mdeditor/mixins/copyable';
import Model from 'mdeditor/models/base';
import { validator, buildValidations } from 'ember-cp-validations';
import config from 'mdeditor/config/environment';
import { v4 as uuidv4 } from 'uuid';

const {
  APP: { defaultProfileId },
} = config;

const Validations = buildValidations({
  recordId: validator('presence', {
    presence: true,
    ignoreBlank: true,
  }),
  'json.metadata.resourceInfo.resourceType': [
    validator('array-valid'),
    validator('array-required', {
      track: ['type'],
    }),
  ],
  'json.metadata.resourceInfo.pointOfContact': {
    disabled: alias('model.isNew'),
    validators: [
      validator('array-valid'),
      validator('array-required', {
        track: ['type'],
      }),
    ],
  },
  // 'json.resourceInfo.abstract': validator('presence', {
  //   presence: true,
  //   ignoreBlank: true
  // }),
  'json.metadata.resourceInfo.citation.title': validator('presence', {
    presence: true,
    ignoreBlank: true,
  }),
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

@classic
class Record extends Model.extend(Validations, Copyable) {
  @belongsTo('pouch-record', { async: false })
  pouchRecord;

  /**
   * Record(metadata) model
   *
   * @class record
   * @constructor
   * @extends base
   * @module mdeditor
   * @submodule data-models
   */

  @attr('string', {
    defaultValue: defaultProfileId,
  })
  profile;

  @attr('json', {
    defaultValue() {
      const obj = EmberObject.create({
        schema: {
          name: 'mdJson',
          version: '2.6.0',
        },
        metadata: {
          metadataInfo: {
            metadataIdentifier: {
              identifier: null,
              namespace: 'urn:uuid',
            },
            metadataContact: [],
            defaultMetadataLocale: {},
          },
          resourceInfo: {
            resourceType: [{}],
            citation: {
              title: null,
              date: [],
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
              periodName: [],
            },
            extent: [],
            keyword: [],
          },
          dataQuality: [],
        },
        metadataRepository: [],
      });

      return obj;
    },
  })
  json;

  @attr('date', {
    defaultValue() {
      return new Date();
    },
  })
  dateUpdated;

  @alias('json.metadata.resourceInfo.citation.title')
  title;

  @computed('json.metadata.resourceInfo.resourceType.firstObject.type')
  get icon() {
    const type =
      this.get('json.metadata.resourceInfo.resourceType.0.type') || '';
    const list = getOwner(this).lookup('service:icon');

    return type
      ? list.get(type) || list.get('default')
      : list.get('defaultFile');
  }

  @alias('json.metadata.metadataInfo.metadataIdentifier.identifier')
  recordId;

  @alias('json.metadata.metadataInfo.metadataIdentifier.namespace')
  recordIdNamespace;

  @alias('json.metadata.metadataInfo.parentMetadata.identifier')
  parentIds;

  @computed('parentIds.[]')
  get hasParent() {
    let ids = this.parentIds;
    let allRecords = this.store.peekAll('record');
    let records = allRecords.rejectBy('hasSchemaErrors');

    if (!ids) {
      return false;
    }

    return ids.find((id) => {
      return records.findBy('recordId', id.identifier) ? true : false;
    });
  }

  @computed('hasParent')
  get defaultParent() {
    let id = this.get('hasParent.identifier');
    let allRecords = this.store.peekAll('record');

    if (!id) {
      return undefined;
    }

    return allRecords.findBy('recordId', id);
  }

  @alias('json.metadata.resourceInfo.resourceType.firstObject.type')
  defaultType;

  /**
   * The trimmed varsion of the recordId.
   *
   * @property shortId
   * @type {String}
   * @readOnly
   * @category computed
   * @requires recordId
   */
  @computed('recordId')
  get shortId() {
    const recordId = this.recordId;
    if (recordId) {
      let index = recordId.indexOf('-');

      return recordId.substring(0, index > -1 ? index : 8);
    }

    return recordId;
  }

  /**
   * A list of schema errors return by the validator.
   *
   * @property hasSchemaErrors
   * @type {Array}
   * @readOnly
   * @category computed
   * @requires status
   */
  @computed('hasDirtyHash', 'customSchemas.[]')
  get schemaErrors() {
    let mdjson = this.mdjson;
    let errors = [];
    let result = mdjson.validateRecord(this).errors;

    if (result) {
      errors.pushObject({
        title: 'Default Record Validation',
        errors: result,
      });
    }

    this.customSchemas.forEach((schema) => {
      const validator = schema.validator;

      if (!validator) {
        return;
      }

      if (validator.validate(schema.rootSchema, mdjson.formatRecord(this))) {
        return;
      }

      errors.pushObject({
        title: schema.title,
        errors: validator.errors,
      });
    });

    return errors;
  }

  @alias('_formatted')
  formatted;

  copy() {
    let current = this.cleanJson;
    let json = EmberObject.create(current);
    let name = current.metadata.resourceInfo.citation.title;
    let newUuid = uuidv4();
    let shortId = newUuid.split('-')[0];

    json.set('metadata.resourceInfo.citation.title', `Copy of ${name}`);
    json.set(
      'metadata.resourceInfo.resourceType',
      getWithDefault(json, 'metadata.resourceInfo.resourceType', [{}])
    );
    json.set('metadata.metadataInfo.metadataIdentifier', {
      identifier: newUuid,
      namespace: 'urn:uuid',
    });

    let newRecord = this.store.createRecord('record', {
      json: json,
      id: shortId,
    });

    return newRecord;
  }
}

Object.defineProperty(Record.prototype, '_formatted', {
  get() {
    return this.mdjson.formatRecord(this);
  },
});

export default Record;
