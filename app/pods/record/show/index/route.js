import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

/* global L */

export default Route.extend(ScrollTo, {
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
