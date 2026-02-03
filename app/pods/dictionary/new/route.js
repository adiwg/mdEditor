import Route from '@ember/routing/route';

export default class NewRoute extends Route {
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'New',
      linkable: false
    }
  }
}