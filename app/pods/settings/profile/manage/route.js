import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ManageRoute extends Route {
  @service store;
  @service profile;

  model() {
    return this.store.findAll('profile');
  }
}