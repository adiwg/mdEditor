import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
  @action
  linkTo() {
    this.transitionTo(...arguments);
  }

  @action
  editDomain(id) {
    this.transitionTo('dictionary.show.edit.domain.edit', id);
  }

  @action
  editCitation(scrollTo) {
    this.transitionTo('dictionary.show.edit.citation')
      .then(function () {
        this.setScrollTo(scrollTo);
      }.bind(this));
  }
}
