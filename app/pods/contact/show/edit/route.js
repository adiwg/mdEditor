import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class EditRoute extends Route {
  @service hashPoll;

  afterModel(model) {
    super.afterModel(...arguments);
    this.hashPoll.startPolling(model);
  }
  deactivate() {
    super.deactivate(...arguments);
    this.hashPoll.stopPolling();
  }
}