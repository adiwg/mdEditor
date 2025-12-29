import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
  setupController(controller, model) {
    super.setupController(controller, model);
    
    // Inject route instance for action delegation
    model.route = this;
  }
  @action
  editIdentifier(index) {
    this.transitionTo('record.show.edit.main.citation.identifier', index)
      .then(function () {
        this.setScrollTo('identifier');
      }.bind(this));
  }
}
