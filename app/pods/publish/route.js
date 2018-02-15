import Ember from 'ember';

const {
  Route,
  inject: {
    service
  }
} = Ember;

export default Route.extend({
  publish: service('publish'),
  model: function() {
    return this.get('publish.catalogs');
  }
});
