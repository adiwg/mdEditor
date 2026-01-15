import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class PreviewComponent extends Component {
  constructor() {
    super(...arguments);

    this.profilePath = this.profilePath || 'preview';
  }

  @service store;

  classNameBindings = ['muted:text-muted'];

  /**
   * Whether to render the text muted.
   *
   * @property muted
   * @type {Boolean}
   * @default "true"
   */
  muted = true;

  get citation() {
    if(!this.item?.mdRecordId) {
      return this.item?.resourceCitation;
    }

    let store = this.store;
    let linked = store.peekAll('record')
      .filterBy('recordId', this.item.mdRecordId)
      .get('firstObject.json.metadata.resourceInfo.citation');

    return linked || this.item?.resourceCitation;
  }

  get metadataIdentifier() {
    if(!this.item?.mdRecordId) {
      return this.item?.metadataCitation?.identifier?.[0];
    }

    let store = this.store;

    return store.peekAll('record')
      .filterBy('recordId', this.item.mdRecordId)
      .get('firstObject.json.metadata.metadataInfo.metadataIdentifier');
  }
}
