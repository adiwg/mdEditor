import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { copy } from 'mdeditor/utils/copy';

/* global L */

export default class IndexController extends Controller.extend(ScrollTo) {
  @service flashMessages;

  @action
  linkTo(route) {
    this.transitionToRoute(route);
  }

  @action
  setupMap(features, m) {
    let map = m.target;
    let bounds = L.geoJson(features)
      .getBounds();

    map.fitBounds(bounds);
  }

  @action
  destroyRecord() {
    let model = this.model;
    model.destroyRecord().then(() => {
      this.flashMessages.success(`Deleted Record: ${model.get('title')}`);
      this.transitionToRoute('records');
    });
  }

  @action
  copyRecord() {
    this.flashMessages.success(
      `Copied Record: ${this.model.get('title')}`
    );
    this.transitionToRoute('record.new.id', copy(this.model));
  }

  @action
  setScrollTo(target) {
    this.set('scrollTo', target);
  }
}
