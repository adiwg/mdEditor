import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { set } from '@ember/object';
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

@classic
export default class MdAssociatedComponent extends Component.extend(Validations) {
  @service store;

  tagName = 'form';

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

  @alias('model.associationType') associationType;

  get linkedRecord() {
    let store = this.store;

    return store.peekAll('record')
      .filterBy('recordId', this.model?.mdRecordId)
      .get('firstObject');
  }

  get linkedAssociation() {
    let ar = this.linkedRecord?.json?.metadata?.associatedResource;

    if(!ar) {
      return null;
    }

    return ar.findBy(
      'mdRecordId', this.recordId);
  }

  get linkedAssociationType() {
    return this.linkedAssociation?.associationType;
  }

  set linkedAssociationType(value) {
    let assoc = this.linkedAssociation;
    let model = this.linkedRecord;

    if(!assoc) {
      model.json.metadata.associatedResource = model.json.metadata.associatedResource ?? [];

      model.get('json.metadata.associatedResource').pushObject({
        mdRecordId: this.recordId,
        associationType: value
      });

      model.notifyPropertyChange('hasDirtyHash');

      return value;
    }

    assoc.associationType = value;
    model.notifyPropertyChange('hasDirtyHash');

    return value;
  }

  editLinked(record) {
    return record;
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function() {
      model.scope = model.scope ?? {};
      model.resourceType = model.resourceType ?? [];
      model.resourceCitation = model.resourceCitation ?? {};
      model.metadataCitation = model.metadataCitation ?? {};
    });
  }
}
