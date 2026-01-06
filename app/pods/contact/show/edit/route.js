import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  hashPoll: service(),

  afterModel(model) {
    this._super(...arguments);
    this.hashPoll.startPolling(model);
  },

  deactivate() {
    this._super(...arguments);
    this.hashPoll.stopPolling();
  }
});
