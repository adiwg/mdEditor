import Route from '@ember/routing/route';
import { action } from '@ember/object';
import EmberObject, { get, set } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class IndexRoute extends Route.extend(ScrollTo) {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata.resourceInfo');
    set(model, 'taxonomy', get(model, 'taxonomy', []));
  }
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
  }

  @action
  editCollection(id) {
    this.setScrollTo(`collection-${id}`);
    this.transitionTo('record.show.edit.taxonomy.collection.index', id);
  }

  @action
  addCollection() {
    let taxa = this.currentRouteModel().get(
      'json.metadata.resourceInfo.taxonomy'
    );
    let collection = EmberObject.create({});

    // once(this, () => {

    taxa.pushObject(collection);
    this.setScrollTo(`collection-${taxa.length - 1}`);
    this.transitionTo(
      'record.show.edit.taxonomy.collection.index',
      taxa.length - 1
    );

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    // });
  }

  @action
  deleteCollection(id) {
    let taxa = this.currentRouteModel().get(
      'json.metadata.resourceInfo.taxonomy'
    );

    taxa.removeAt(id);
  }
}
