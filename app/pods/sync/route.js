import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SyncRoute extends Route {
  @service couch;

  async beforeModel() {
    await this.couch.setup();
  }
}
