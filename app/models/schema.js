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

const regex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

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

  status: computed('validations.isInvalid', function() {
    return this.validations.isInvalid ? 'warning' : 'success';
  }),

  formattedType: computed('schemaType', function() {
    return this.schemaType === 'record' ? 'Metadata' : capitalize(this.schemaType || 'Unknown');
  }),

  formattedGlobal: computed('isGlobal', function() {
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

  localVersion: or('version','rootSchema.version'),

  hasUpdate: computed('version', 'remoteVersion','customSchemas.0.version', function() {
    return this.remoteVersion ? semver.gt(this.remoteVersion, this.localVersion): false;
  }),

  rootSchema: computed('customSchemas.firstObject.schema', function() {
    return this.customSchemas.get('firstObject.schema');
  }),

  /* eslint-disable ember/no-observers */
  updateSettings: observer('hasDirtyAttributes',
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
  theComp as
  default
};
