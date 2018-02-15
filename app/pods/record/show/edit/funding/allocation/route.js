import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';

const {
  Route,
  get,
  isEmpty,
  isArray,
  computed,
  NativeArray
} = Ember;

export default Route.extend(ScrollTo, {
  breadCrumb: computed('allocationId', function () {
    return {
      title: get(this, 'allocationId'),
      linkable: true
    };
  }),

  model(params) {
    this.set('allocationId', params.allocation_id);

    return this.setupModel();
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    //this.controller.set('parentModel', this.modelFor('record.show.edit.main'));
    this.controller.set('allocationId', get(this, 'allocationId'));

    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let allocationId = get(this, 'allocationId');
    let model = this.modelFor('record.show.edit');
    let objects = model.get('json.metadata.funding');
    let resource = allocationId && isArray(objects) ? NativeArray.apply(
        objects)
      .objectAt(allocationId) :
      undefined;

    //make sure the allocation exists
    if(isEmpty(resource)) {
      Ember.get(this, 'flashMessages')
        .warning('No Funding object found! Re-directing to list...');
      this.replaceWith('record.show.edit.funding');

      return;
    }

    return resource;
  }
});
