import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import { get } from '@ember/object';

export default Route.extend({
  model(params, transition) {
    this.set('sourceId', params.source_id);
    this.set('lineageId', transition.params[
      'record.show.edit.lineage.lineageobject'].lineage_id);

    return this.setupModel();
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let sourceId = get(this, 'sourceId');
    let lineageId = get(this, 'lineageId');
    let model = this.modelFor('record.show.edit');
    let sources = model.get(
      'json.metadata.resourceLineage.' + lineageId + '.source');
    let source = sourceId && isArray(sources) ? sources.get(
      sourceId) : undefined;

    //make sure the identifier exists
    if(isEmpty(source)) {
      get(this, 'flashMessages')
        .warning('No source found! Re-directing...');
      this.replaceWith('record.show.edit.lineage.lineageobject');

      return;
    }

    return source;
  },
  actions: {
    parentModel() {
      return this.modelFor('record.show.edit');
    }
  }
});
