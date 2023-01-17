import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray, A } from '@ember/array';

export default Route.extend({
  model(params) {
    this.set('distributionId', params.distribution_id);
    this.set('distributorId', params.distributor_id);

    return this.setupModel();
  },

  // breadCrumb: computed('distributionId', function () {
  //   return {
  //     title: this.distributionId
  //     //title: `${get(this, 'distributionId')}: Distributors`
  //   };
  // }),

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    //this.controller.set('parentModel', this.modelFor('record.show.edit.main'));
    this.controller.set('distributionId', this.distributionId);
    this.controller.set('distributorId', this.distributorId);
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let distributionId = this.distributionId;
    let distributorId = this.distributorId;
    let model = this.modelFor('record.show.edit');
    let objects = model.get('json.metadata.resourceDistribution');
    let distribution = distributionId && isArray(objects) ? A(
        objects).objectAt(distributionId) :
      undefined;
    let distributor = distribution && distributorId && isArray(distribution
        .distributor) ? A(
        distribution.distributor).objectAt(distributorId) :
      undefined;

    //make sure the identifier exists
    if(isEmpty(distributor)) {
      this.flashMessages
        .warning('No Distributor object found! Re-directing to Distribution List...');
      this.replaceWith('record.show.edit.distribution');

      return;
    }

    return distributor;
  }
});
