import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  @service flashMessages;

  setupController(controller, model) {
    super.setupController(controller, model);
    
    // Pass services that controller actions need
    controller.flashMessages = this.flashMessages;
  }
}
