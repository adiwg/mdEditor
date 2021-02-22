import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { get, action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
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
    super.setupController(...arguments);

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

  @action
  backToEntity() {
    this.transitionTo('dictionary.show.edit.entity.edit', this.entityId);
  }

  @action
  editCitation(scrollTo) {
    this.transitionTo('dictionary.show.edit.domain.edit.citation').then(
      function () {
        this.setScrollTo(scrollTo);
      }.bind(this)
    );
  }
}
