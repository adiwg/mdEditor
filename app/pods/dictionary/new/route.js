import Route from '@ember/routing/route';

export default class NewRoute extends Route {
  init() {
    super.init(...arguments);

    this.breadCrumb = {
      title: 'New',
      linkable: false
    }
  }
}