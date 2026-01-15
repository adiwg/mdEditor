import Route from '@ember/routing/route';
import { action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class IndexRoute extends Route.extend(ScrollTo) {
    linkTo(){
      this.transitionTo(...arguments);
    }
    editDomain(id) {
      this.transitionTo('dictionary.show.edit.domain.edit', id);
    }
    editCitation(scrollTo) {
      this.transitionTo('dictionary.show.edit.citation')
        .then(function () {
          this.setScrollTo(scrollTo);
        }.bind(this));
    }
}