import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import { get } from '@ember/object';

export default class LineageobjectRoute extends Route {
  @service flashMessages;
  get breadCrumb() {
    return {
      title: this.lineageId,
      linkable: true
    };
  }

  model(params) {
    this.set('lineageId', params.lineage_id);

    return this.setupModel();
  }
  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    //this.controller.set('parentModel', this.modelFor('record.show.edit.main'));
    this.controller.set('lineageId', this.lineageId);
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  }
  setupModel() {
    let lineageId = this.lineageId;
    let model = this.modelFor('record.show.edit');
    let objects = model.get('json.metadata.resourceLineage');
    let lineage = lineageId && isArray(objects) ? objects.get(lineageId) :
      undefined;

    //make sure the identifier exists
    if(isEmpty(lineage)) {
      this.flashMessages
        .warning('No lineage object found! Re-directing to list...');
      this.replaceWith('record.show.edit.lineage');

      return;
    }

    return lineage;
  }
}