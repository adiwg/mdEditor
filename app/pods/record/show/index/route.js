import Route from '@ember/routing/route';
import { action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

/* global L */

export default class IndexRoute extends Route.extend(ScrollTo) {
    linkTo(route){
      this.transitionTo(route);
    }
    setupMap(features, m) {
      let map = m.target;
      let bounds = L.geoJson(features)
        .getBounds();

      map.fitBounds(bounds);
    }
}