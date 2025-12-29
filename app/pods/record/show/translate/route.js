import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';

@classic
export default class TranslateRoute extends Route {
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
    this.transitionTo('settings.main');
  }
}
