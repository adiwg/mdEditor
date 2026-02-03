import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Record',
      linkable: false
    }
  }
}