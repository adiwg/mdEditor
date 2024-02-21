import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SyncCouchRoute extends Route {
  @service couch;

  async beforeModel() {
    await this.couch.setup();
  }
}