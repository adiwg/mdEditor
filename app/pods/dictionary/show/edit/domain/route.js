import Route from '@ember/routing/route';

export default class DomainRoute extends Route {
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Domains'
    }
  }
}