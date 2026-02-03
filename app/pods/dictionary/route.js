import Route from '@ember/routing/route';

export default class DictionaryRoute extends Route {
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Dictionary',
      linkable: false
    }
  }
}