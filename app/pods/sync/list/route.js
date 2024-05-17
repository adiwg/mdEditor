import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SyncListRoute extends Route {
  @service pouch;
  @service couch;

  async beforeModel() {
    await this.couch.setup();
    await this.pouch.setup();
  }

  async model() {
    return this.pouch.pouchModels;
  }
}

