import Route from '@ember/routing/route';
import {
  get
} from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  beforeModel(transition) {
    this.set('entityId', transition.params[
      'dictionary.show.edit.entity.edit'].entity_id);
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    let parent = this.controllerFor('dictionary.show.edit.entity.edit');

    this.controller.set('parentModel', this.modelFor(
      'dictionary.show.edit'));
    this.controller.set('entityId', get(parent, 'entityId'));

    this.controllerFor('dictionary.show.edit')
      .setProperties({
        onCancel: parent.get('setupModel'),
        cancelScope: this
      });
  },

  actions: {
    editCitation(id) {
      this.transitionTo('dictionary.show.edit.entity.edit.citation', id)
        .then(function () {
          this.setScrollTo('entity-reference');
        }.bind(this));
    },
    editAttribute(id) {
      this.transitionTo('dictionary.show.edit.entity.edit.attribute.index',
          id)
        .then(function () {
          this.setScrollTo('md-attribute-' + id);
        }.bind(this));
    }
  }
});
