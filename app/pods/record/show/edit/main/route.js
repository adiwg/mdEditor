import Route from '@ember/routing/route';

export default class MainRoute extends Route {
  model() {
    return this.modelFor('record.show.edit');
  }
}