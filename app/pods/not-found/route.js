import EmberObject from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class NotFoundRoute extends Route {
  @service router;
  model(params) {
    return EmberObject.create({
      path: params.path,
    });
  }
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Page Not Found',
      linkable: false,
    };
  }
  redirect() {
    var url = this.router.location.formatURL('/not-found');

    if (window.location.pathname !== url) {
      this.router.transitionTo('/not-found');
    }
  }
}
