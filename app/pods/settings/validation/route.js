import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
// import EmberObject from '@ember/object';

@classic
export default class ValidationRoute extends Route {
  model() {
    return this.store.findAll('schema');
  }

  @service
  schemas;
}
