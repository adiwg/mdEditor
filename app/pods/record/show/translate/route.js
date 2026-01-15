import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class TranslateRoute extends Route {
  setupController(controller, model) {
    this._super(controller, model);

    controller.setProperties({
      writer: controller.writer || null,
      forceValid: controller.forceValid || false,
      showAllTags: controller.showAllTags || false,
    });
  }
    goToSettings() {
      this.transitionTo('settings.main');
    }
}