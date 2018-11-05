import Ember from 'ember';

const {
  Route,
  get,
  isEmpty,
  isArray,
  NativeArray,
  computed
} = Ember;

export default Route.extend({
  model(params) {
    this.set('distributionId', params.distribution_id);

    return this.setupModel();
  },

  breadCrumb: computed('distributionId', function () {
    return {
      title: 'Distributors'
      //title: `${get(this, 'distributionId')}: Distributors`
    };
  }),

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    //this.controller.set('parentModel', this.modelFor('record.show.edit.main'));
    this.controller.set('distributionId', get(this, 'distributionId'));
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let distributionId = get(this, 'distributionId');
    let model = this.modelFor('record.show.edit');
    let objects = model.get('json.metadata.resourceDistribution');
    let resource = distributionId && isArray(objects) ? NativeArray.apply(
        objects).objectAt(distributionId) :
      undefined;

    //make sure the identifier exists
    if(isEmpty(resource)) {
      Ember.get(this, 'flashMessages')
        .warning('No Distribution object found! Re-directing to list...');
      this.replaceWith('record.show.edit.distribution');

      return;
    }

    return resource;
  }
});
