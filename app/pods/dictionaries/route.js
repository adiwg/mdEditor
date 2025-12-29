import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class DictionariesRoute extends Route {
  model() {
    //return this.store.peekAll('contact');
    return this.modelFor('application').findBy('modelName','dictionary');
  }
}
