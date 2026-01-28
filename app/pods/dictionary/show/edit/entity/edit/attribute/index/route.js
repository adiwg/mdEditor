import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route.extend(ScrollTo) {
  @service router;

  beforeModel() {
    this.set(
      'entityId',
      this.paramsFor('dictionary.show.edit.entity.edit').entity_id
    );
    this.set(
      'attributeId',
      this.paramsFor('dictionary.show.edit.entity.edit.attribute').attribute_id
    );
  }
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    let parent = this.controllerFor(
      'dictionary.show.edit.entity.edit.attribute'
    );

    this.controller.set('parentModel', this.modelFor('dictionary.show.edit'));
    this.controller.set('entityId', this.entityId);
    this.controller.set('attributeId', this.attributeId);
    this.controllerFor('dictionary.show.edit').setProperties({
      onCancel: get(parent, 'setupModel'),
      cancelScope: this,
    });
  }
  backToEntity() {
    this.router.transitionTo('dictionary.show.edit.entity.edit', this.entityId);
  }
  editCitation(scrollTo) {
    this.router.transitionTo('dictionary.show.edit.domain.edit.citation').then(
      function () {
        this.setScrollTo(scrollTo);
      }.bind(this)
    );
  }
}
