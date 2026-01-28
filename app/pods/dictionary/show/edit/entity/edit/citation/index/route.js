import Route from '@ember/routing/route';
import { action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route.extend(ScrollTo) {
  @service router;

  editIdentifier(index) {
    this.router
      .transitionTo(
        'dictionary.show.edit.entity.edit.citation.identifier',
        index
      )
      .then(
        function () {
          this.setScrollTo('entity-identifier');
        }.bind(this)
      );
  }
  backToEntity() {
    this.router.transitionTo('dictionary.show.edit.entity.edit', this.entityId);
  }
}
