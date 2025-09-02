import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class MdTaxonomy extends Component {
  @service
  router;

  @computed('model.taxonomicSystem.0.citation.title')
  get title() {
    let title = this.get('model.taxonomicSystem.0.citation.title');
    let index = this.index;

    return `Collection #${index}` + (title ? `: ${title}`: '');
  }

  @action
  editCollection(id) {
    this.set('scrollTo',`collection-${id}`);
    this.router.transitionTo('record.show.edit.taxonomy.collection.index', id);
  }

  @action
  deleteCollection(id) {
    let taxa = this.get('record.json.metadata.resourceInfo.taxonomy');
    taxa.removeAt(id);
  }
}
