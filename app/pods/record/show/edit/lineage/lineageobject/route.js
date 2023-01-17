import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import { computed, get } from '@ember/object';

export default Route.extend({
  breadCrumb: computed('lineageId', function () {
    return {
      title: get(this, 'lineageId'),
      linkable: true
    };
  }),

  model(params) {
    this.set('lineageId', params.lineage_id);

    return this.setupModel();
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    //this.controller.set('parentModel', this.modelFor('record.show.edit.main'));
    this.controller.set('lineageId', get(this, 'lineageId'));
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let lineageId = get(this, 'lineageId');
    let model = this.modelFor('record.show.edit');
    let objects = model.get('json.metadata.resourceLineage');
    let lineage = lineageId && isArray(objects) ? objects.get(lineageId) :
      undefined;

    //make sure the identifier exists
    if(isEmpty(lineage)) {
      get(this, 'flashMessages')
        .warning('No lineage object found! Re-directing to list...');
      this.replaceWith('record.show.edit.lineage');

      return;
    }

    return lineage;
  }
});
