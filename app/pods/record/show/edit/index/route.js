import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service router;

  model() {
    return this.modelFor('record.show.edit');
  }

  redirect() {
    this.router.replaceWith('record.show.edit.main');
  }
}
