import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class RecordsRoute extends Route {
  model() {
    //return this.store.peekAll('contact');
    return this.modelFor('application').findBy('modelName', 'record');
  }
}
