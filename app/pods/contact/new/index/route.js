import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  redirect() {
    let rec = this.store.createRecord('contact');

    this.replaceWith('contact.new.id', rec.id);
  }
}