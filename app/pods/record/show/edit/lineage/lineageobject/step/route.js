import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import { computed, get } from '@ember/object';

export default Route.extend({
  model(params, transition) {
    this.set('stepId', params.step_id);
    this.set('lineageId', transition.params[
      'record.show.edit.lineage.lineageobject'].lineage_id);

    return this.setupModel();
  },

  breadCrumb: computed('stepId', function () {
    return {
      title: 'Step ' + get(this, 'stepId'),
      linkable: true
    };
  }),

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controller.set('stepId', get(this, 'stepId'));
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let stepId = get(this, 'stepId');
    let lineageId = get(this, 'lineageId');
    let model = this.modelFor('record.show.edit');
    let steps = model.get(
      'json.metadata.resourceLineage.' + lineageId + '.processStep');
    let step = stepId && isArray(steps) ? steps.get(
      stepId) : undefined;

    //make sure the identifier exists
    if(isEmpty(step)) {
      get(this, 'flashMessages')
        .warning('No Process Step found! Re-directing...');
      this.replaceWith('record.show.edit.lineage.lineageobject');

      return;
    }

    return step;
  },
  actions: {
    parentModel() {
      return this.modelFor('record.show.edit');
    }
  }
});
