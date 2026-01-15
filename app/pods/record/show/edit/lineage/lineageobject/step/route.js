import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import { get } from '@ember/object';

export default class StepRoute extends Route {
  model(params) {
    this.set('stepId', params.step_id);
    this.set('lineageId', this.paramsFor(
      'record.show.edit.lineage.lineageobject').lineage_id);

    return this.setupModel();
  }
  get breadCrumb() {
    return {
      title: 'Step ' + this.stepId,
      linkable: true
    };
  }

  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controller.set('stepId', this.stepId);
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  }
  setupModel() {
    let stepId = this.stepId;
    let lineageId = this.lineageId;
    let model = this.modelFor('record.show.edit');
    let steps = model.get(
      'json.metadata.resourceLineage.' + lineageId + '.processStep');
    let step = stepId && isArray(steps) ? steps.get(
      stepId) : undefined;

    //make sure the identifier exists
    if(isEmpty(step)) {
      this.flashMessages
        .warning('No Process Step found! Re-directing...');
      this.replaceWith('record.show.edit.lineage.lineageobject');

      return;
    }

    return step;
  }
    parentModel() {
      return this.modelFor('record.show.edit');
    }
}