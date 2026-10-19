import Route from '@ember/routing/route';

export default class DictionaryRoute extends Route {
  init() {
    super.init(...arguments);

    this.breadCrumb = {
      title: 'Dictionary',
      linkable: false
    }
  }
}