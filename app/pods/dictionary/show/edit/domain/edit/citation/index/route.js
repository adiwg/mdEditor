import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { isEmpty } from '@ember/utils';
import { get, set } from '@ember/object';

export default class IndexRoute extends Route.extend(ScrollTo) {
  @service router;

  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Reference',
    };
  }
  afterModel(model) {
    let domainId = this.paramsFor('dictionary.show.edit.domain.edit').domain_id;

    if (isEmpty(get(model, 'domainReference'))) {
      set(model, 'domainReference', {});
    }

    this.set('domainId', domainId);
  }
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('dictionary.show.edit'));
  }
  backToDomain() {
    this.router.transitionTo('dictionary.show.edit.domain.edit', this.domainId);
  }
  editIdentifier(index) {
    this.router
      .transitionTo(
        'dictionary.show.edit.domain.edit.citation.identifier',
        index
      )
      .then(
        function () {
          this.setScrollTo('identifier');
        }.bind(this)
      );
  }
}
