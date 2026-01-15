import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  redirect() {
    let rec = this.store.createRecord('dictionary');

    this.replaceWith('dictionary.new.id', rec.id);
  }
}