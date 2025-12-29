import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { get, computed } from '@ember/object';

@classic
@classNameBindings('muted:text-muted')
export default class Preview extends Component {
  init() {
    super.init(...arguments);

    this.profilePath = this.profilePath || 'preview';
  }

  @service
  store;

  /**
   * Whether to render the text muted.
   *
   * @property muted
   * @type {Boolean}
   * @default "true"
   */
  muted = true;

  @computed('item', 'item.mdRecordId')
  get citation() {
    if(!this.get('item.mdRecordId')) {
      return this.get('item.resourceCitation');
    }

    let store = this.store;
    let linked = store.peekAll('record')
      .filterBy('recordId', get(this, 'item.mdRecordId'))
      .get('firstObject.json.metadata.resourceInfo.citation');

    return linked || this.get('item.resourceCitation');
  }

  @computed('item.{metadataCitation.identifier,mdRecordId}')
  get metadataIdentifier() {
    if(!this.get('item.mdRecordId')) {
      return this.get('item.metadataCitation.identifier.0');
    }

    let store = this.store;

    return store.peekAll('record')
      .filterBy('recordId', get(this, 'item.mdRecordId'))
      .get('firstObject.json.metadata.metadataInfo.metadataIdentifier');
  }
}
