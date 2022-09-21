import Route from "@ember/routing/route";
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { get } from '@ember/object';
import { defineProperty } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Route.extend(ScrollTo, {
  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
    this.controller.set('rasterId', get(this.controllerFor(
       'record.show.edit.spatial.raster'),
     'rasterId'));

    defineProperty(this.controller, 'refreshSpy', alias(
      'model.json.metadata.resourceInfo.coverageDescription.length'));
  },

  actions: {
    editAttribute(id, routeParams, scrollToId) {
      this.setScrollTo(scrollToId);
      this.transitionTo('record.show.edit.spatial.raster.attribute', this.controller.rasterId,
        routeParams, id);
    },

    deleteAttrGroup(id) {
      let group = this.currentRouteModel()['attributeGroup'];

      group.removeAt(id)
    },

    addAttrGroup() {
      let group = this.currentRouteModel()['attributeGroup'];

      group.pushObject([]);

    },
  }
});
