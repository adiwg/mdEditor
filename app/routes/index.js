import Route from '@ember/routing/route';

export default Route.extend({
  /** Redirect to dashboard route */
  redirect() {
    this.transitionTo('dashboard');
  },
});
