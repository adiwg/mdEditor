import Route from '@ember/routing/route';
import { action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class IndexRoute extends Route.extend(ScrollTo) {
    editIdentifier(index) {
      this.transitionTo('dictionary.show.edit.entity.edit.citation.identifier', index)
        .then(function () {
          this.setScrollTo('entity-identifier');
        }.bind(this));
    }
  backToEntity() {
    this.transitionTo('dictionary.show.edit.entity.edit',
      this.entityId);
  }
}