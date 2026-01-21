import Route from "@ember/routing/route";
import { action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { get, defineProperty } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class IndexRoute extends Route.extend(ScrollTo) {
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
    this.controller.set('rasterId', get(this.controllerFor(
       'record.show.edit.spatial.raster'),
     'rasterId'));

    defineProperty(this.controller, 'refreshSpy', alias(
      'model.json.metadata.resourceInfo.coverageDescription.length'));
  }

  @action
  editAttribute(id, routeParams, scrollToId) {
      this.setScrollTo(scrollToId);
      this.transitionTo('record.show.edit.spatial.raster.attribute', this.controller.rasterId,
      routeParams, id);
  }

  @action
  deleteAttrGroup(id) {
    let group = this.currentRouteModel()['attributeGroup'];

    group.removeAt(id)
  }

  @action
  addAttrGroup() {
    let group = this.currentRouteModel()['attributeGroup'];

    group.pushObject([]);

  }
}