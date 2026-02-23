import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

@classic
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
      .filterBy('recordId', this.item.mdRecordId)[0];

    return linked?.get('json.metadata.resourceInfo.citation') || this.item?.resourceCitation;
  }

  get metadataIdentifier() {
    if(!this.item?.mdRecordId) {
      return this.item?.metadataCitation?.identifier?.[0];
    }

    let store = this.store;

    return store.peekAll('record')
      .filterBy('recordId', this.item.mdRecordId)[0]
      ?.get('json.metadata.metadataInfo.metadataIdentifier');
  }
}
