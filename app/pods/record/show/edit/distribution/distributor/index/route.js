import Route from '@ember/routing/route';
import { get } from '@ember/object';
// import { computed } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  // breadCrumb: computed('controller.distributorId', function () {
  //   return {
  //     title: `Distributor ${this.controller.distributorId}`
  //     //title: `${get(this, 'distributionId')}: Distributors`
  //   };
  // }),

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
    this.controller.set('distributionId', get(this.controllerFor(
        'record.show.edit.distribution.distributor'),
      'distributionId'));
    this.controller.set('distributorId', get(this.controllerFor(
        'record.show.edit.distribution.distributor'),
      'distributorId'));
  },

  actions: {
    // addDistributor() {
    //   let model = this.currentRouteModel();
    //   let dists = get(model, 'distributor');
    //
    //   if(dists) {
    //     dists.pushObject({});
    //   } else {
    //     set(model, 'distributor', [{}]);
    //   }
    //
    //   this.controller.set('refresh', get(model, 'distributor.length'));
    //
    //   $("html, body").animate({
    //     scrollTop: $(document).height()
    //   }, "slow");
    // },
    // editDistributor(id) {
    //   return id;
    // },
    deleteDistributor(id) {
      let model = this.controller.parentModel.get(
          'json.metadata.resourceDistribution')[this.controller.distributionId]
        .distributor;

      model.removeAt(id || parseInt(this.controller.distributorId, 10));
      this.transitionTo('record.show.edit.distribution', {
        queryParams: {
          scrollTo: `distribution-${this.controller.distributionId}`
        }
      });
    },
    editTransferOption(id, routeParams, scrollToId) {
      this.setScrollTo(scrollToId);
      this.transitionTo(
        'record.show.edit.distribution.distributor.transfer',
        this.controller.distributorId, this.controller.distributionId, id
      );
    },
  }
});
