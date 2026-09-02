import Route from '@ember/routing/route';

export default class ContactRoute extends Route {
  init() {
    super.init(...arguments);

    this.breadCrumb = {
      title: 'Contact',
      linkable: false
    }
  }
}