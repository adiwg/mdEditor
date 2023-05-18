import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  init() {
    this._super(...arguments);

    this.profilePath = this.profilePath || 'preview';
  },
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

  citation: computed('item.{mdRecordId,resourceCitation}', function() {
    if(!this.get('item.mdRecordId')) {
      return this.get('item.resourceCitation');
    }

    let store = this.store;
    let linked = store.peekAll('record')
      .filterBy('recordId', get(this, 'item.mdRecordId'))
      .get('firstObject.json.metadata.resourceInfo.citation');

    return linked || this.get('item.resourceCitation');
  }),

  metadataIdentifier: computed('item.mdRecordId', 'item.metadataCitation.identifier.0', function() {
    if(!this.get('item.mdRecordId')) {
      return this.get('item.metadataCitation.identifier.0');
    }

    let store = this.store;

    return store.peekAll('record')
      .filterBy('recordId', get(this, 'item.mdRecordId'))
      .get('firstObject.json.metadata.metadataInfo.metadataIdentifier');
  }),
});
