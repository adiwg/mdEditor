import Route from '@ember/routing/route';
import { action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route.extend(ScrollTo) {
  @service router;

  @action
  linkTo() {
    this.router.transitionTo(...arguments);
  }

  @action
  editDomain(id) {
    this.router.transitionTo('dictionary.show.edit.domain.edit', id);
  }

  @action
  editCitation(scrollTo) {
    this.router.transitionTo('dictionary.show.edit.citation').then(
      function () {
        this.setScrollTo(scrollTo);
      }.bind(this)
    );
  }
}
