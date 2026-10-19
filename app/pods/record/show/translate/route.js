import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TranslateRoute extends Route {
  @service router;

  model() {
    return this.modelFor('record.show');
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    controller.setProperties({
      writer: controller.writer || null,
      forceValid: controller.forceValid || false,
      showAllTags: controller.showAllTags || false,
    });
  }
  @action
  goToSettings() {
    this.router.transitionTo('settings.main');
  }
}
