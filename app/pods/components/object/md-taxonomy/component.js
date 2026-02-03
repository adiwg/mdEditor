import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

@classic
export default class MdTaxonomyComponent extends Component {
  @service router;

  get title() {
    let title = this.model.taxonomicSystem?.[0]?.citation?.title;
    let index = this.index;

    return `Collection #${index}` + (title ? `: ${title}`: '');
  }

  @action
  editCollection(id) {
    this.scrollTo = `collection-${id}`;
    this.router.transitionTo('record.show.edit.taxonomy.collection.index', id);
  }

  @action
  deleteCollection(id) {
    let taxa = this.record.json.metadata.resourceInfo.taxonomy;
    taxa.removeAt(id);
  }
}
