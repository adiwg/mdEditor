import Route from '@ember/routing/route';
import {
  isEmpty
} from '@ember/utils';
import {
  isArray
} from '@ember/array';
import {
  computed,
  get
} from '@ember/object';
import {
  A
} from '@ember/array';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  breadCrumb: computed('allocationId', function () {
    return {
      title: 'Allocation ' + get(this, 'allocationId'),
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

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
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
    let resource = allocationId && isArray(objects) ? A(objects).objectAt(
      allocationId) : undefined;

    //make sure the allocation exists
    if(isEmpty(resource)) {
      get(this, 'flashMessages')
        .warning('No Funding object found! Re-directing to list...');
      this.replaceWith('record.show.edit.funding');

      return;
    }

    return resource;
  }
});
