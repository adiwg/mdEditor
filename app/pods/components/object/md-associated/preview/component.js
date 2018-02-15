import Ember from 'ember';

const {
  Component,
  get,
  computed,
  inject: {
    service
  }
} = Ember;

export default Component.extend({
  store: service(),
  classNameBindings: ['muted:text-muted'],

  /**
   * Whether to render the text muted.
   *
   * @property muted
   * @type {Boolean}
   * @default "true"
   */
  muted: true,

  citation: computed('item', 'item.mdRecordId', function() {
    if(!this.get('item.mdRecordId')) {
      return this.get('item.resourceCitation');
    }

    let store = this.get('store');

    return store.peekAll('record')
      .filterBy('recordId', get(this, 'item.mdRecordId'))
      .get('firstObject.json.metadata.resourceInfo.citation');
  }),

  metadataIdentifier: computed('item.metadataCitation.identifier', 'item.mdRecordId', function() {
    if(!this.get('item.mdRecordId')) {
      return this.get('item.metadataCitation.identifier.0');
    }

    let store = this.get('store');

    return store.peekAll('record')
      .filterBy('recordId', get(this, 'item.mdRecordId'))
      .get('firstObject.json.metadata.metadataInfo.metadataIdentifier');
  }),
});
