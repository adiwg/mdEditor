import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { get, action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
  beforeModel() {
    this.set('entityId', this.paramsFor(
      'dictionary.show.edit.entity.edit').entity_id);
  }

  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    let parent = this.controllerFor('dictionary.show.edit.entity.edit');

    this.controller.set('parentModel', this.modelFor(
      'dictionary.show.edit'));
    this.controller.set('entityId', get(parent, 'entityId'));

    this.controllerFor('dictionary.show.edit')
      .setProperties({
        onCancel: parent.get('setupModel'),
        cancelScope: this
      });
  }

  @action
  editCitation(id) {
    this.transitionTo('dictionary.show.edit.entity.edit.citation', id)
      .then(function () {
        this.setScrollTo('entity-reference');
      }.bind(this));
  }

  @action
  editAttribute(id) {
    this.transitionTo('dictionary.show.edit.entity.edit.attribute.index',
        id)
      .then(function () {
        this.setScrollTo('md-attribute-' + id);
      }.bind(this));
  }
}
