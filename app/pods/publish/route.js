import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PublishRoute extends Route {
  @service publish;
  @service token;

  async beforeModel() {
    await this.token.setup();
  }

  model() {
    return this.publish.catalogs;
  }
}