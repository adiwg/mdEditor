import classic from 'ember-classic-decorator';
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
}