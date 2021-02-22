import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  redirect() {
    let rec = this.store.createRecord('dictionary');

    this.replaceWith('dictionary.new.id', rec.id);
  }
}
