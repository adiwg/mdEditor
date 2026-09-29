import Route from '@ember/routing/route';

export default class CitationRoute extends Route {
  init() {
    super.init(...arguments);

    this.breadCrumb = {
      title: 'Reference'
    }
  }
}