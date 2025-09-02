import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
import { attr, belongsTo } from '@ember-data/model';
import { Copyable } from 'ember-copy';
import Model from 'mdeditor/models/base';
import { validator, buildValidations } from 'ember-cp-validations';
import EmberObject, { computed } from '@ember/object';
import config from 'mdeditor/config/environment';
import { v4 as uuidv4 } from 'uuid';

const {
  APP: { defaultProfileId },
} = config;

const Validations = buildValidations({
  'json.dataDictionary.dictionaryId': validator('presence', {
    presence: true,
    ignoreBlank: true,
  }),
  'json.dataDictionary.citation.title': validator('presence', {
    presence: true,
    ignoreBlank: true,
  }),
  'json.dataDictionary.subject': [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
    validator('array-required', {
      track: [],
    }),
  ],
});

@classic
class JsonDefault extends EmberObject {
  init() {
    super.init(...arguments);
    this.setProperties({
      dataDictionary: {
        dictionaryId: null,
        citation: {
          title: null,
          date: [
            {
              date: new Date().toISOString(),
              dateType: 'creation',
            },
          ],
        },
        description: '',
        subject: [],
        responsibleParty: {},
        domain: [],
        entity: [],
      },
    });
  }
}

@classic
export default class Dictionary extends Model.extend(Validations, Copyable) {
  @belongsTo('pouch-dictionary', { async: false })
  pouchDictionary;

  /**
   * Dictionary model
   *
   * @class dictionary
   * @constructor
   * @extends base
   * @module mdeditor
   * @submodule data-models
   */

  init() {
    super.init(...arguments);

    this.on('didLoad', this, this.assignId);
  }

  @attr('string', {
    defaultValue: defaultProfileId,
  })
  profile;

  @attr('json', {
    defaultValue() {
      return JsonDefault.create();
    },
  })
  json;

  @attr('date', {
    defaultValue() {
      return new Date();
    },
  })
  dateUpdated;

  @alias('json.dataDictionary.citation.title')
  title;

  @alias('json.dataDictionary.dictionaryId')
  dictionaryId;

  icon = 'book';

  /**
   * A list of schema errors return by the validator.
   *
   * @property schemaErrors
   * @type {Array}
   * @readOnly
   * @category computed
   * @requires status
   */
  @computed('hasDirtyHash', 'customSchemas.[]')
  get schemaErrors() {
    let mdjson = this.mdjson;
    let errors = [];
    let result = mdjson.validateDictionary(this).errors;

    if (result) {
      errors.pushObject({
        title: 'Default Dictionary Validation',
        errors: result,
      });
    }

    this.customSchemas.forEach((schema) => {
      const validator = schema.validator;

      if (validator.validate(schema.rootSchema, this.cleanJson)) {
        return;
      }

      errors.pushObject({
        title: schema.title,
        errors: validator.errors,
      });
    });

    return errors;
  }

  copy() {
    let current = this.cleanJson;
    let json = EmberObject.create(current);
    let name = current.dataDictionary.citation.title;
    let newUuid = uuidv4();
    let shortId = newUuid.split('-')[0];

    json.set('dataDictionary.citation.title', `Copy of ${name}`);
    json.set('dataDictionary.dictionaryId', newUuid);

    let newDictionary = this.store.createRecord('dictionary', {
      json: json,
      id: shortId,
    });

    return newDictionary;
  }
}
