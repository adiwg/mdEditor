import Ember from 'ember';
import Ajv from 'npm:ajv';
import Schemas from 'npm:mdjson-schemas/resources/js/schemas.js';

const validator = new Ajv({
  verbose: true,
  allErrors: true,
  jsonPointers: true,
  removeAdditional: false
});

Object.keys(Schemas)
  .forEach(function(key) {
    let val = Schemas[key];

    validator.addSchema(val, key);
  });

const {
  Service,
  inject,
  isArray,
  set,
  get
} = Ember;

const unImplemented = [
  'dataDictionary',
  'metadata.metadataInfo.otherMetadataLocale',
  'metadata.resourceInfo.spatialRepresentation', [
    'metadata.resourceInfo.extent',
    'verticalExtent'
  ],
  ['metadata.resourceInfo.extent',
    'temporalExtent'
  ],
  'metadata.resourceInfo.coverageDescription',
  'metadata.resourceInfo.taxonomy',
  'metadata.resourceInfo.otherResourceLocale',
  'metadata.resourceInfo.resourceMaintenance'
];

export default Service.extend({
  cleaner: inject.service(),
  contacts: inject.service(),
  store: inject.service(),

  // _replacer(key, value) {
  //   //console.log(arguments);
  //   if(key==='contactId' && !_contacts.includes(value)){
  //     _contacts.push(value);
  //   }
  //   return value;
  // }

  formatRecord(rec, asText) {
    let _contacts = [];
    let conts = this.get('contacts');

    const _replacer = (key, value) => {
      let check = {
        contactId: true,
        sourceId: true,
        recipientId: true
      };
      //console.log(arguments);
      if(check[key] && !_contacts.includes(value)) {
        if(!conts.get('contacts').findBy('contactId', value)) {
          return null;
        }
        _contacts.push(value);
      }

      return value;
    };

    let cleaner = this.get('cleaner');
    let clean = cleaner.clean(get(rec, 'json'));
    let json = JSON.parse(JSON.stringify(clean, _replacer));
    let contacts = this.get('store')
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
  }
});
