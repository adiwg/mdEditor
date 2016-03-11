import Ember from 'ember';

export default Ember.Route.extend({
  /** Redirect to dashboard route */
  redirect() {
    this.transitionTo('dashboard');
  }
});
