import classic from 'ember-classic-decorator';
import EmberObject from '@ember/object';
import Route from '@ember/routing/route';

@classic
export default class NotFoundRoute extends Route {
  model(params) {
    return EmberObject.create({
      path: params.path
    });
  }

  init() {
    super.init(...arguments);

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
