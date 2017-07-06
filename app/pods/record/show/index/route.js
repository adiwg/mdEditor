import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
  actions: {
    linkTo(route){
      this.transitionTo(route);
    }
  }
});
