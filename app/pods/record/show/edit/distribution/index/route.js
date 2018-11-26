import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({
  setupController: function() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
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
    editDistribution(id) {
      this.transitionTo('record.show.edit.distribution.distributor', id);
    },
    deleteDistribution(id) {
      let dists = this.currentRouteModel().get(
        'json.metadata.resourceDistribution');

      dists.removeAt(id);
    }
  }
});
