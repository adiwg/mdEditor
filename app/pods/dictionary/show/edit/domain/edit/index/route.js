import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route.extend(ScrollTo) {
  @service router;

  beforeModel() {
    this.set(
      'domainId',
      this.paramsFor('dictionary.show.edit.domain.edit').domain_id
    );
  }
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    let parent = this.controllerFor('dictionary.show.edit.domain.edit');

    this.controller.set('parentModel', this.modelFor('dictionary.show.edit'));
    this.controller.set('domainId', get(parent, 'domainId'));

    this.controllerFor('dictionary.show.edit').setProperties({
      onCancel: parent.get('setupModel'),
      cancelScope: this,
    });
  }
  editCitation(scrollTo) {
    this.router.transitionTo('dictionary.show.edit.domain.edit.citation').then(
      function () {
        this.setScrollTo(scrollTo);
      }.bind(this)
    );
  }
  editDomainItem(id) {
    this.router.transitionTo('dictionary.show.edit.domain.edit.item', id).then(
      function () {
        this.setScrollTo('md-domainitem-' + id);
      }.bind(this)
    );
  }
}
