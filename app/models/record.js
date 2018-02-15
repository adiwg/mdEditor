import Ember from 'ember';
import DS from 'ember-data';
import uuidV4 from "npm:uuid/v4";
import Model from 'mdeditor/models/base';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const {
  Copyable,
  computed
} = Ember;

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
export default Model.extend(Validations, Copyable, {
  profile: DS.attr('string', {
    defaultValue: 'full'
  }),
  json: DS.attr('json', {
    defaultValue() {
      const obj = Ember.Object.create({
        schema: {
          name: 'mdJson',
          version: '2.0.0'
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
          }
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

  title: computed.alias('json.metadata.resourceInfo.citation.title'),

  icon: computed('json.metadata.resourceInfo.resourceType.firstObject.type',
    function() {
      const type = this.get(
          'json.metadata.resourceInfo.resourceType.firstObject.type') ||
        '';
      const list = Ember.getOwner(this)
        .lookup('service:icon');

      return type ? list.get(type) || list.get('default') : list.get(
        'defaultFile');
    }),

  recordId: computed.alias(
    'json.metadata.metadataInfo.metadataIdentifier.identifier'),
  recordIdNamespace: computed.alias(
    'json.metadata.metadataInfo.metadataIdentifier.namespace'),

  parentIds: computed.alias(
    'json.metadata.metadataInfo.parentMetadata.identifier'),

  hasParent: computed('parentIds.[]', function() {
    let ids = this.get('parentIds');
    let records = this.get('store')
      .peekAll('record')
      .rejectBy(
        'hasSchemaErrors');

    if(!ids) {
      return false;
    }

    return ids.find((id) => {
      return records.findBy('recordId', id.identifier) ? true :
        false;
    });
  }),

  defaultParent: computed('hasParent', function() {
    let id = this.get('hasParent.identifier');

    if(!id) {
      return undefined;
    }

    return this.get('store')
      .peekAll('record')
      .findBy(
        'recordId', id);
  }),

  defaultType: computed.alias(
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
  shortId: Ember.computed('recordId', function() {
    const recordId = this.get('recordId');
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
  hasSchemaErrors: computed('status', function() {
    let mdjson = this.get('mdjson');
    let errors = mdjson.validateRecord(this)
      .errors;

    //console.log(errors);

    return errors;
  }),

  formatted: computed(function() {
      let mdjson = this.get('mdjson');

      return mdjson.formatRecord(this);
    })
    .volatile(),

  status: computed('hasDirtyHash', function() {
    let dirty = this.get('hasDirtyHash');
    let errors = this.get('hasSchemaErrors');

    if(this.get('currentHash')) {
      return dirty ? 'danger' : errors ? 'warning' : 'success';
    }

    return 'success';
  }),

  copy() {
    let current = this.get('cleanJson');
    let json = Ember.Object.create(current);
    let name = current.metadata.resourceInfo.citation.title;

    json.set('metadata.resourceInfo.citation.title', `Copy of ${name}`);
    json.set('metadata.metadataInfo.metadataIdentifier', {
      identifier: uuidV4(),
      namespace: 'urn:uuid'
    });

    return this.store.createRecord('record', {
      json: json
    });
  }
});
