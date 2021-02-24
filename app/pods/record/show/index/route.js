import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

/* global L */

@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
  @action
  linkTo(route) {
    this.transitionTo(route);
  }

  @action
  setupMap(features, m) {
    let map = m.target;
    let bounds = L.geoJson(features).getBounds();

    map.fitBounds(bounds);
  }
}