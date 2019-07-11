import Route from '@ember/routing/route';
import $ from 'jquery';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { alias } from '@ember/object/computed';
import { defineProperty } from '@ember/object';

export default Route.extend(ScrollTo, {
  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
    defineProperty(this.controller, 'refreshSpy', alias(
      'model.json.metadata.resourceDistribution.length'));
  },

  actions: {
    addDistribution() {
      let dists = this.currentRouteModel()
        .get('json.metadata.resourceDistribution');

      dists.pushObject({});

      $("html, body").animate({
        scrollTop: $(document).height()
      }, "slow");

    },
    editDistributor(id, routeParams, scrollToId) {
      this.setScrollTo(scrollToId);
      this.transitionTo('record.show.edit.distribution.distributor',
        routeParams, id);
    },
    deleteDistribution(id) {
      let dists = this.currentRouteModel().get(
        'json.metadata.resourceDistribution');

      dists.removeAt(id);
    }
  }
});
