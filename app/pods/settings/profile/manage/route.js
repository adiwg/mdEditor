import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class ManageRoute extends Route {
  model() {
    return this.store.findAll('profile');
  }

  @service
  profile;
}
