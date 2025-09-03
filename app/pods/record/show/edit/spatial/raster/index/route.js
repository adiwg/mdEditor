import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
import Route from "@ember/routing/route";
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { get, defineProperty, action } from '@ember/object';

@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

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
