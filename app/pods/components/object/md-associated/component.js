import Ember from 'ember';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const {
  Component,
  computed,
  set,
  get,
  getWithDefault,
  run: {
    once
  },
  inject: {
    service
  }
} = Ember;

const Validations = buildValidations({
  'associationType': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

export default Component.extend(Validations, {
  store: service(),

  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    once(this, function() {
      set(model, 'scope', getWithDefault(model, 'scope', {}));
      set(model, 'resourceType', getWithDefault(model, 'resourceType', []));
      set(model, 'resourceCitation', getWithDefault(model,
        'resourceCitation', {}));
      set(model, 'metadataCitation', getWithDefault(model,
        'metadataCitation', {}));
    });
  },

  tagName: 'form',

  /**
   * The string representing the path in the profile object for the resource.
   *
   * @property profilePath
   * @type {String}
   * @default "false"
   * @required
   */

  /**
   * The object to use as the data model for the resource.
   *
   * @property model
   * @type {Object}
   * @required
   */

  associationType: computed.alias('model.associationType'),

  linkedRecord: computed('model.mdRecordId', function() {
    let store = this.get('store');

    return store.peekAll('record')
      .filterBy('recordId', get(this, 'model.mdRecordId'))
      .get('firstObject');
  }),

  linkedAssociation: computed(
    'linkedRecord.json.metadata.associatedResource.[]',
    function() {
      return this.get('linkedRecord.json.metadata.associatedResource').findBy(
        'mdRecordId', this.get('recordId'));
    }),

  linkedAssociationType: computed('linkedAssociation.associationType', {
    get() {
      return this.get('linkedAssociation.associationType');
    },
    set(key, value) {
      let assoc = this.get('linkedAssociation');

      if(!assoc) {
        let model = this.get('linkedRecord');

        set(model, 'associatedResource', getWithDefault(model,
          'associatedResource', []));

        model.get('json.metadata.associatedResource').pushObject({
          mdRecordId: get(this, 'recordId'),
          associationType: value
        });

        return value;
      }

      assoc.set('associationType', value);

      return value;
    }
  }),

  editLinked(record) {
    return record;
  }
});
