import classic from 'ember-classic-decorator';
import { observes } from '@ember-decorators/object';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { or } from '@ember/object/computed';
import Model, { attr } from '@ember-data/model';
import { once } from '@ember/runloop';
import { capitalize } from '@ember/string';
import { validator, buildValidations } from 'ember-cp-validations';
import semver from 'semver';
import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import * as draft4 from 'ajv/lib/refs/json-schema-draft-04';
import ajv from 'ajv';

const ajvOptions = {
  verbose: true,
  allErrors: true,
  jsonPointers: true,
  removeAdditional: false,
  schemaId: 'auto',
};

const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

const checkVersion = function () {
  if (!this.localVersion && this.remoteVersion) {
    return true;
  }

  return this.remoteVersion
    ? semver.gt(this.remoteVersion, this.localVersion)
    : false;
};

const Validations = buildValidations({
  title: validator('presence', {
    presence: true,
    ignoreBlank: true,
  }),
  description: validator('presence', {
    presence: true,
    ignoreBlank: true,
  }),
  schemaType: [
    validator('presence', true),
    validator('inclusion', {
      description: 'This value',
      in: ['record', 'contact', 'dictionary'],
    }),
  ],
  uri: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
    validator('format', {
      regex: regex,
      isWarning: false,
      message: 'This field should be a valid, resolvable URL.',
    }),
  ],
  customSchemas: [
    validator('array-valid'),
    validator('array-required', {
      track: ['type'],
      isWarning: true,
    }),
  ],
});

@classic
class theComp extends Model.extend(Validations) {
  /**
   * Schema model
   *
   * @class schema
   * @constructor
   * @extends DS.Model
   * @module mdeditor
   * @submodule data-models
   */
  init() {
    super.init(...arguments);

    this.schemaValidator = new Ajv(ajvOptions);
    ajvErrors(this.schemaValidator);
    this.schemaValidator.addMetaSchema(draft4);
    this.updateSettings;
  }

  @service
  flashMessages;

  @attr('string')
  title;

  @attr('string')
  uri;

  @attr('string')
  description;

  @attr('string')
  schemaType;

  @attr('string')
  version;

  @attr('string')
  remoteVersion;

  @attr('boolean', {
    defaultValue: false,
  })
  isGlobal;

  @attr('json', {
    defaultValue: function () {
      return [];
    },
  })
  customSchemas;

  @computed('validations.isInvalid')
  get status() {
    return this.validations.isInvalid ? 'warning' : 'success';
  }

  @computed('schemaType')
  get formattedType() {
    return this.schemaType === 'record'
      ? 'Metadata'
      : capitalize(this.schemaType || 'Unknown');
  }

  @computed('isGlobal')
  get formattedGlobal() {
    return this.isGlobal ? 'Yes' : 'No';
  }

  /**
   * The timestamp for the record
   *
   * @attribute dateUpdated
   * @type {date}
   * @default new Date()
   * @required
   */
  @attr('date', {
    defaultValue() {
      return new Date();
    },
  })
  dateUpdated;

  @or('version', 'rootSchema.version')
  localVersion;

  @computed('version', 'remoteVersion', 'customSchemas.0.version')
  get hasUpdate() {
    return checkVersion.call(this);
  }

  @computed('customSchemas.firstObject.schema')
  get rootSchema() {
    return this.customSchemas.get('firstObject.schema');
  }

  @computed('isGlobal', 'customSchemas')
  get validator() {
    if (!this.isGlobal && !this.get('customSchemas.length')) {
      return;
    }

    this.schemaValidator.removeSchema();

    let valid = this.customSchemas.every((schema) => {
      return this.schemaValidator.validateSchema(schema.schema);
    });

    if (valid) {
      return this.schemaValidator.addSchema(this.customSchemas.mapBy('schema'));
    }

    this.flashMessages.danger(
      `Could not load schemas for ${this.title}. Schemas provided did not validate.`
    );
  }

  /* eslint-disable ember/no-observers */
  @observes(
    'hasDirtyAttributes',
    'title',
    'uri',
    'description',
    'schemaType',
    'remoteVersion',
    'schemaType',
    'isGlobal',
    'customSchemas.[]'
  )
  updateSettings() {
    if (this.isNew || this.isEmpty || this.isDeleted) {
      return;
    }

    if (this.hasDirtyAttributes) {
      this.set('dateUpdated', new Date());

      once(this, function () {
        this.save();
      });
    }
  }
  /* eslint-enable ember/no-observers */
}

export { regex, checkVersion, theComp as default };
