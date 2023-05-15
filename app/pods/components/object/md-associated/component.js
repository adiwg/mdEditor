import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { getWithDefault, get, set, computed } from '@ember/object';
import { once } from '@ember/runloop';
import { inject as service } from '@ember/service';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

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

    let model = this.model;

    once(this, function() {
      set(model, 'scope', (model.scope === undefined ? {} : model.scope));
      set(model, 'resourceType', (model.resourceType === undefined ? [] : model.resourceType));
      set(model, 'resourceCitation', (model.resourceCitation === undefined ? {} : model.resourceCitation));
      set(model, 'metadataCitation', (model.metadataCitation === undefined ? {} : model.metadataCitation));
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

  associationType: alias('model.associationType'),

  linkedRecord: computed('model.mdRecordId', function() {
    let store = this.store;

    return store.peekAll('record')
      .filterBy('recordId', get(this, 'model.mdRecordId'))
      .get('firstObject');
  }),

  linkedAssociation: computed(
    'linkedRecord.json.metadata.associatedResource.[]', 'recordId',
    function() {
      let ar = this.get('linkedRecord.json.metadata.associatedResource');

      if(!ar) {
        return null;
      }

      return ar.findBy(
        'mdRecordId', this.recordId);
    }),

  linkedAssociationType: computed('linkedAssociation.associationType', {
    get() {
      return this.get('linkedAssociation.associationType');
    },
    set(key, value) {
      let assoc = this.linkedAssociation;
      let model = this.linkedRecord;

      if(!assoc) {
        set(model, 'json.metadata.associatedResource', (get(model, 'json.metadata.associatedResource') === undefined ? [] : get(model, 'json.metadata.associatedResource')));

        model.get('json.metadata.associatedResource').pushObject({
          mdRecordId: this.recordId,
          associationType: value
        });

        model.notifyPropertyChange('hasDirtyHash');

        return value;
      }

      set(assoc, 'associationType', value);
      model.notifyPropertyChange('hasDirtyHash');

      return value;
    }
  }),

  editLinked(record) {
    return record;
  }
});
