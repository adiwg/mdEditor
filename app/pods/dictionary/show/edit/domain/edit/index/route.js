import Route from '@ember/routing/route';
import { get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  beforeModel(transition) {
    this.set('domainId', transition.params[
      'dictionary.show.edit.domain.edit'].domain_id);
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    let parent = this.controllerFor('dictionary.show.edit.domain.edit');

    this.controller.set('parentModel', this.modelFor('dictionary.show.edit'));
    this.controller.set('domainId', get(parent, 'domainId'));

    this.controllerFor('dictionary.show.edit')
      .setProperties({
        onCancel: parent.get('setupModel'),
        cancelScope: this
      });
  },

  actions: {
    editCitation(scrollTo) {
      this.transitionTo('dictionary.show.edit.domain.edit.citation')
        .then(function () {
          this.setScrollTo(scrollTo);
        }.bind(this));
    },
    editDomainItem(id) {
      this.transitionTo('dictionary.show.edit.domain.edit.item', id)
        .then(function () {
          this.setScrollTo('md-domainitem-' + id);
        }.bind(this));
    }
  }
});
