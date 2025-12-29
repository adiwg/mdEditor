import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { defineProperty } from '@ember/object';

@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
  setupController(controller, model) {
    super.setupController(controller, model);

    defineProperty(
      this.controller,
      'refreshSpy',
      alias('model.json.metadata.resourceInfo.extent.length')
    );

    // Inject route instance and parent route for action delegation
    model.route = this;
    model.parentRoute = this.parentRoute;
  }
}
