import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  /** Redirect to dashboard route */
  redirect() {
    this.transitionTo('dashboard');
  }
}
