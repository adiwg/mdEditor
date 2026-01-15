import EmberObject from '@ember/object';
import Route from '@ember/routing/route';

export default class NotFoundRoute extends Route {
  model(params) {
    return EmberObject.create({
      path: params.path
    });
  }
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Page Not Found',
      linkable: false
    };
  }
  redirect() {
    var url = this.router.location.formatURL('/not-found');

    if(window.location.pathname !== url) {
      this.transitionTo('/not-found');
    }
  }
}