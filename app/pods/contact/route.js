import Route from '@ember/routing/route';

export default class ContactRoute extends Route {
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Contact',
      linkable: false
    }
  }
}