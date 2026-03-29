import Controller from '@ember/controller';
import { action } from '@ember/object';
import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';

export default class TaxonomyIndexController extends Controller {
  @service router;
  @action
  editCollection(id) {
    this.setScrollTo(`collection-${id}`);
    this.router.transitionToRoute(
      'record.show.edit.taxonomy.collection.index',
      id
    );
  }

  @action
  addCollection() {
    let taxa = this.model.get('json.metadata.resourceInfo.taxonomy');
    let collection = EmberObject.create({
      taxonomicSystem: [],
      identificationReference: [],
      observer: [],
      voucher: [],
      taxonomicClassification: [],
    });

    taxa.pushObject(collection);
    this.setScrollTo(`collection-${taxa.length - 1}`);
    this.router.transitionToRoute(
      'record.show.edit.taxonomy.collection.index',
      taxa.length - 1
    );

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  @action
  deleteCollection(id) {
    let taxa = this.model.get('json.metadata.resourceInfo.taxonomy');

    taxa.removeAt(id);
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
