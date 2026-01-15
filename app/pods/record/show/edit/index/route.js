import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  redirect(model) {
    this.replaceWith('record.show.edit.main', model);
  }
}