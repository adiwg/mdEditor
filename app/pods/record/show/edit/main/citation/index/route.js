import Route from '@ember/routing/route';
import { action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route.extend(ScrollTo) {
  @service router;

  @action
  editIdentifier(index) {
    this.router
      .transitionTo('record.show.edit.main.citation.identifier', index)
      .then(
        function () {
          this.setScrollTo('identifier');
        }.bind(this)
      );
  }
}
