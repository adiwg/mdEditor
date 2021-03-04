import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { get, action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
  beforeModel() {
    this.set(
      'domainId',
      this.paramsFor('dictionary.show.edit.domain.edit').domain_id
    );
  }

  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    let parent = this.controllerFor('dictionary.show.edit.domain.edit');

    this.controller.set('parentModel', this.modelFor('dictionary.show.edit'));
    this.controller.set('domainId', get(parent, 'domainId'));

    this.controllerFor('dictionary.show.edit').setProperties({
      onCancel: parent.get('setupModel'),
      cancelScope: this,
    });
  }

  @action
  editCitation(scrollTo) {
    this.transitionTo('dictionary.show.edit.domain.edit.citation').then(
      function () {
        this.setScrollTo(scrollTo);
      }.bind(this)
    );
  }

  @action
  editDomainItem(id) {
    this.transitionTo('dictionary.show.edit.domain.edit.item', id).then(
      function () {
        this.setScrollTo('md-domainitem-' + id);
      }.bind(this)
    );
  }
}
