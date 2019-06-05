import DS from 'ember-data';
import { once } from '@ember/runloop';
import { computed, observer } from '@ember/object';
import { or } from '@ember/object/computed';
import { capitalize } from '@ember/string';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import semver from 'semver';
import Ajv from 'ajv';
import * as ajvErrors from 'ajv-errors';
import * as draft4 from 'ajv/lib/refs/json-schema-draft-04';

const ajvOptions = {
  verbose: true,
  allErrors: true,
  jsonPointers: true,
  removeAdditional: false,
  schemaId: 'auto'
};

const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

const checkVersion = function () {
  if(!this.localVersion && this.remoteVersion) {
    return true;
  }

  return this.remoteVersion ? semver.gt(this.remoteVersion, this.localVersion) :
    false;
};

const Validations = buildValidations({
  'title': validator(
    'presence', {
      presence: true,
      ignoreBlank: true,
    }),
  'description': validator('presence', {
    presence: true,
    ignoreBlank: true
  }),
  'schemaType': [
    validator('presence', true),
    validator('inclusion', {
      description: 'This value',
      in: ['record', 'contact', 'dictionary']
    })
  ],
  'uri': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    }),
    validator('format', {
      regex: regex,
      isWarning: false,
      message: 'This field should be a valid, resolvable URL.'
    })
  ],
  'customSchemas': [
    validator('array-valid'),
    validator('array-required', {
      track: ['type'],
      isWarning: true
    })
  ],
});

const theComp = DS.Model.extend(Validations, {
  init() {
    this._super(...arguments);

    this.schemaValidator = ajvErrors(new Ajv(ajvOptions));
    this.schemaValidator.addMetaSchema(draft4);
    this.updateSettings;
  },
  title: DS.attr('string'),
  uri: DS.attr('string'),
  description: DS.attr('string'),
  schemaType: DS.attr('string'),
  version: DS.attr('string'),
  remoteVersion: DS.attr('string'),
  isGlobal: DS.attr('boolean', {
    defaultValue: false
  }),
  customSchemas: DS.attr('json', {
    defaultValue: function () {
      return [];
    }
  }),

  status: computed('validations.isInvalid', function () {
    return this.validations.isInvalid ? 'warning' : 'success';
  }),

  formattedType: computed('schemaType', function () {
    return this.schemaType === 'record' ? 'Metadata' : capitalize(this.schemaType ||
      'Unknown');
  }),

  formattedGlobal: computed('isGlobal', function () {
    return this.isGlobal ? 'Yes' : 'No';
  }),

  /**
   * The timestamp for the record
   *
   * @attribute dateUpdated
   * @type {date}
   * @default new Date()
   * @required
   */
  dateUpdated: DS.attr('date', {
    defaultValue() {
      return new Date();
    }
  }),

  localVersion: or('version', 'rootSchema.version'),

  hasUpdate: computed('version', 'remoteVersion', 'customSchemas.0.version',
    checkVersion
  ),

  rootSchema: computed('customSchemas.firstObject.schema', function () {
    return this.customSchemas.get('firstObject.schema');
  }),

  validator: computed('isGlobal', 'customSchemas', function () {
    if(!this.isGlobal && !this.get('customSchemas.length')) {
      return;
    }

    this.schemaValidator.removeSchema();

    return this.schemaValidator.addSchema(this.customSchemas.mapBy(
      'schema'));
  }),

  /* eslint-disable ember/no-observers */
  updateSettings: observer('hasDirtyAttributes', 'title', 'uri',
    'description', 'schemaType', 'remoteVersion', 'schemaType',
    'isGlobal', 'customSchemas.[]',
    function () {
      if(this.isNew || this.isEmpty || this.isDeleted) {
        return;
      }

      if(this.hasDirtyAttributes) {
        this.set('dateUpdated', new Date());

        once(this, function () {
          this.save();
        });
      }
    })
  /* eslint-enable ember/no-observers */
});

export {
  regex,
  checkVersion,
  theComp as
  default
};
