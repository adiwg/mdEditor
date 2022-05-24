import Service, {
  inject as service
} from '@ember/service';
import {
  isArray
} from '@ember/array';
import EmberObject, {
  getWithDefault,
  get,
  set
} from '@ember/object';
import Ember from 'ember';
import Ajv from 'ajv';
import Schemas from 'mdjson-schemas/resources/js/schemas';
import {
  formatCitation
} from 'mdeditor/pods/components/object/md-citation/component';
import * as draft4 from 'ajv/lib/refs/json-schema-draft-04';

Ember.libraries.register('mdJson-schemas', Schemas.schema.version);

const validator = new Ajv({
  verbose: true,
  allErrors: true,
  jsonPointers: true,
  removeAdditional: false,
  meta: false,
  schemaId: 'id'
});

//support draft-04
validator.addMetaSchema(draft4);

Object.keys(Schemas)
  .forEach(function (key) {
    if(key === 'default') {
      return;
    }
    let val = Schemas[key];

    validator.addSchema(val, key);
  });

const unImplemented = [
  'metadata.metadataInfo.otherMetadataLocale',
  'metadata.resourceInfo.spatialRepresentation', [
    'metadata.resourceInfo.extent',
    'verticalExtent'
  ],
  ['metadata.resourceInfo.extent',
    'temporalExtent'
  ],
  'metadata.resourceInfo.coverageDescription',
  //'metadata.resourceInfo.taxonomy',
  'metadata.resourceInfo.otherResourceLocale',
  //'metadata.resourceInfo.resourceMaintenance'
];

export default Service.extend({
  cleaner: service(),
  contacts: service(),
  store: service(),

  injectCitations(json) {
    let assoc = json.metadata.associatedResource;

    if(assoc) {
      let refs = assoc.reduce((acc, itm) => {
        if(itm.mdRecordId) {
          acc.push(itm);
        }
        return acc;
      }, []);

      let records = this.store.peekAll('record').filterBy('recordId');

      refs.forEach((ref) => {
        let record = records.findBy('recordId', ref.mdRecordId);

        if(record) {
          let info = get(record, 'json.metadata.metadataInfo') || {};
          let metadata = {
            'title': `Metadata for ${get(record,'title')}`,
            'responsibleParty': getWithDefault(info,
              'metadataContact', []),
            'date': getWithDefault(info, 'metadataDate', []),
            'onlineResource': getWithDefault(info,
              'metadataOnlineResource', []),
            'identifier': [getWithDefault(info, 'metadataIdentifier', {})],
          };

          let citation = get(record,
            'json.metadata.resourceInfo.citation') || {};
          let resourceType = get(record,
            'json.metadata.resourceInfo.resourceType') || [];

          set(ref, 'resourceCitation', EmberObject.create(
            formatCitation(
              citation)));
          set(ref, 'metadataCitation', EmberObject.create(
            formatCitation(
              metadata)));
          set(ref, 'resourceType', resourceType);
          set(ref, 'mdRecordId', null);

          return;
        }

        set(ref, 'mdRecordId', null);
      });
    }
  },

  injectDictionaries(rec, json) {
    let ids = rec.get('json.mdDictionary') || [];
    let arr = [];

    if(ids.length) {

      let dicts = this.store.peekAll('dictionary').filterBy(
        'dictionaryId');

      ids.forEach((id) => {
        let record = dicts.findBy('dictionaryId', id);

        if(record) {
          arr.pushObject(record.get('json.dataDictionary'));
        }
      });
    }

    set(json, 'dataDictionary', arr);
  },

  formatRecord(rec, asText) {
    let _contacts = [];
    let conts = this.contacts;

    const _replacer = function (key, value) {
      let check = {
        contactId: true,
        sourceId: true,
        recipientId: true
      };

      if(key === 'sourceId' && !('amount' in this || 'currency' in this)) {
        //console.log(this);
        return value;
      }

      if(check[key] && !_contacts.includes(value)) {
        let contact = conts.get('contacts').findBy('contactId', value);

        if(!contact) {

          return null;
        }

        let orgs = isArray(contact.get('json.memberOfOrganization')) ?
          contact.get('json.memberOfOrganization').slice(0) : null;
        _contacts.push(value);

        if(orgs && orgs.length) {
          orgs.forEach(itm => {
            let org = conts.get('contacts').findBy('contactId', itm);

            if(!org) {
              return;
            }

            if(!_contacts.includes(itm) && org) {
              _contacts.push(itm);
            }

            let iOrgs = org.get('json.memberOfOrganization');

            if(iOrgs.length) {
              iOrgs.forEach(iOrg => {
                if(!_contacts.includes(iOrg)) {
                  orgs.push(iOrg);
                }
              });
            }
          });
        }
      }

      return value;
    };

    let cleaner = this.cleaner;
    let clean = cleaner.clean(get(rec, 'json'));

    this.injectCitations(clean);
    this.injectDictionaries(rec, clean);

    let json = JSON.parse(JSON.stringify(cleaner.clean(clean), _replacer));
    let contacts = this.store
      .peekAll('contact')
      .mapBy('json');

    json.contact = contacts.filter((item) => {
      return _contacts.includes(get(item, 'contactId'));
    });

    if(unImplemented) {
      unImplemented.forEach((path) => {
        let array = isArray(path);
        let target = array ? get(json, path[0]) : get(json, path);

        if(target) {
          if(array) {
            target.forEach((item) => {
              set(item, path[1], undefined);
            });

            return;
          }

          set(json, path, undefined);
        }

      });
    }

    return asText ? JSON.stringify(cleaner.clean(json)) : cleaner.clean(
      json);
  },

  validateRecord(record) {
    validator.validate('schema', this.formatRecord(record));

    return validator;
  },

  validateContact(contact) {
    validator.validate('contact', contact.get('cleanJson'));

    return validator;
  },

  validateDictionary(dictionary) {
    validator.validate('dataDictionary', dictionary.get('cleanJson').dataDictionary);

    return validator;
  }
});
