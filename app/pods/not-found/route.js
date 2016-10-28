import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.Object.create({
      path: params.path
    });
  },

  breadCrumb: {
    title: 'Page Not Found',
    linkable: false
  },

  redirect() {
    var url = this.router.location.formatURL('/not-found');

    if(window.location.pathname !== url) {
      this.transitionTo('/not-found');
    }
  }
});
