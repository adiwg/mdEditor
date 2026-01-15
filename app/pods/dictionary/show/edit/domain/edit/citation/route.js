import Route from '@ember/routing/route';

export default class CitationRoute extends Route {
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Reference'
    }
  }
}