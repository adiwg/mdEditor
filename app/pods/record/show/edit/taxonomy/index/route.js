import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import EmberObject, { get, set, getWithDefault, action } from '@ember/object';
/* global $ */
import ScrollTo from 'mdeditor/mixins/scroll-to';

@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
  afterModel(m) {
    super.afterModel(...arguments);

    let model = get(m, 'json.metadata.resourceInfo');
    set(model, 'taxonomy', getWithDefault(model, 'taxonomy', []));
  }

  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

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

    $('html, body').animate(
      {
        scrollTop: $(document).height(),
      },
      'slow'
    );
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
