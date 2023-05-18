import Route from '@ember/routing/route';
import {
  get
} from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  beforeModel() {
    this.set('entityId', this.paramsFor(
      'dictionary.show.edit.entity.edit').entity_id);
    this.set('attributeId', this.paramsFor(
      'dictionary.show.edit.entity.edit.attribute').attribute_id);
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    let parent = this.controllerFor('dictionary.show.edit.entity.edit.attribute');

    this.controller.set('parentModel', this.modelFor(
      'dictionary.show.edit'));
    this.controller.set('entityId', this.entityId);
    this.controller.set('attributeId', this.attributeId);
    this.controllerFor('dictionary.show.edit')
      .setProperties({
        onCancel: parent.setupModel,
        cancelScope: this
      });
  },

  actions: {
    backToEntity() {
      this.transitionTo('dictionary.show.edit.entity.edit',
        this.entityId);
    },
    editCitation(scrollTo) {
      this.transitionTo('dictionary.show.edit.domain.edit.citation')
        .then(function () {
          this.setScrollTo(scrollTo);
        }.bind(this));
    }
  }
});
