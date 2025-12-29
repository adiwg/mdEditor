import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { getWithDefault, get, set, computed } from '@ember/object';
import { once } from '@ember/runloop';
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

@classic
@tagName('form')
export default class MdAssociated extends Component.extend(Validations) {
  @service
  store;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function() {
      set(model, 'scope', getWithDefault(model, 'scope', {}));
      set(model, 'resourceType', getWithDefault(model, 'resourceType', []));
      set(model, 'resourceCitation', getWithDefault(model,
        'resourceCitation', {}));
      set(model, 'metadataCitation', getWithDefault(model,
        'metadataCitation', {}));
    });
  }

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

  @alias('model.associationType')
  associationType;

  @computed('model.mdRecordId')
  get linkedRecord() {
    let store = this.store;

    return store.peekAll('record')
      .filterBy('recordId', get(this, 'model.mdRecordId'))
      .get('firstObject');
  }

  @computed('linkedRecord.json.metadata.associatedResource.[]')
  get linkedAssociation() {
    let ar = this.get('linkedRecord.json.metadata.associatedResource');

    if(!ar) {
      return null;
    }

    return ar.findBy(
      'mdRecordId', this.recordId);
  }

  @computed('linkedAssociation.associationType')
  get linkedAssociationType() {
    return this.get('linkedAssociation.associationType');
  }

  set linkedAssociationType(value) {
    let assoc = this.linkedAssociation;
    let model = this.linkedRecord;

    if(!assoc) {
      set(model, 'json.metadata.associatedResource', getWithDefault(model,
        'json.metadata.associatedResource', []));

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

  editLinked(record) {
    return record;
  }
}
