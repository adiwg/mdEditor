import { Copyable } from 'ember-copy'
import DS from 'ember-data';
import uuidV4 from "uuid/v4";
import { alias } from '@ember/object/computed';
import Model from 'mdeditor/models/base';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import EmberObject, { computed } from '@ember/object';

const Validations = buildValidations({
  'json.dataDictionary.citation.title': validator('presence', {
    presence: true,
    ignoreBlank: true
  }),
  'json.dataDictionary.subject': [validator('presence', {
      presence: true,
      ignoreBlank: true
    }),
    validator('array-required', {
      track: []
    })
  ]
});

const JsonDefault = EmberObject.extend({
  init() {
    this._super(...arguments);
    this.setProperties({
      dictionaryId: uuidV4(),
      dataDictionary: {
        citation: {
          title: null,
          date: [{
            date: new Date()
              .toISOString(),
            dateType: 'creation'
          }]
        },
        description: '',
        subject: [],
        responsibleParty: {},
        domain: [],
        entity: []
      },
    });
  }
});

export default Model.extend(Validations, Copyable, {
  json: DS.attr('json', {
    defaultValue() {
      return JsonDefault.create();
    }
  }),
  dateUpdated: DS.attr('date', {
    defaultValue() {
      return new Date();
    }
  }),

  title: alias('json.dataDictionary.citation.title'),
  dictionaryId: alias('json.dictionaryId'),

  icon: 'book',

  status: computed('hasDirtyHash', function () {
    let dirty = this.hasDirtyHash;
    let errors = this.hasSchemaErrors;

    if(this.currentHash) {
      return dirty ? 'danger' : errors ? 'warning' : 'success';
    }

    return 'success';
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
  hasSchemaErrors: computed('status', function () {
    let mdjson = this.mdjson;
    let errors = mdjson.validateDictionary(this)
      .errors;

    //console.log(errors);

    return errors;
  }),

  copy() {
    let current = this.cleanJson;
    let json = EmberObject.create(current);
    let name = current.dataDictionary.citation.title;

    json.set('dataDictionary.citation.title', `Copy of ${name}`);

    return this.store.createRecord('dictionary', {
      json: json
    });
  }
});
