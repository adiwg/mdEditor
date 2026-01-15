import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ManageRoute extends Route {
  model() {
    return this.store.findAll('profile');
  }
  @service profile;
}