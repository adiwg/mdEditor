import Route from '@ember/routing/route';
import { action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { inject as service } from '@ember/service';

/* global L */

export default class IndexRoute extends Route.extend(ScrollTo) {
  @service router;

  @action
  linkTo(route) {
    this.router.transitionTo(route);
  }

  @action
  setupMap(features, m) {
    let map = m.target;
    let bounds = L.geoJson(features).getBounds();

    map.fitBounds(bounds);
  }
}
