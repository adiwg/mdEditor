import Route from '@ember/routing/route';

export default class DomainRoute extends Route {
  init() {
    super.init(...arguments);

    this.breadCrumb = {
      title: 'Domains'
    }
  }
}