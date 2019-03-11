import Route from '@ember/routing/route';
import { set, get } from '@ember/object';
import $ from 'jquery';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  setupController: function() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
    this.controller.set('distributionId', get(this.controllerFor(
        'record.show.edit.distribution.distributor'),
      'distributionId'));
  },
  actions: {
    addDistributor() {
      let model = this.currentRouteModel();
      let dists = get(model, 'distributor');

      if(dists) {
        dists.pushObject({});
      } else {
        set(model, 'distributor', [{}]);
      }

      this.controller.set('refresh', get(model, 'distributor.length'));

      $("html, body").animate({
        scrollTop: $(document).height()
      }, "slow");
    },
    editDistributor(id) {
      return id;
    },
    deleteDistributor(id) {
      let model = this.currentRouteModel();
      let dists = get(model, 'distributor');

      dists.removeAt(id);
      this.controller.set('refresh', get(model, 'distributor.length'));
    }
  }
});
