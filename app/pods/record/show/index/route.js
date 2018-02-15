import Ember from 'ember';

const { Route } = Ember;

/* global L */

export default Route.extend({
  actions: {
    linkTo(route){
      this.transitionTo(route);
    },
    setupMap(features, m) {
      let map = m.target;
      let bounds = L.geoJson(features)
        .getBounds();

      map.fitBounds(bounds);
    }
  }
});
