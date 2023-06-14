import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';

export default Route.extend({
  model(params) {
    this.set('sourceId', params.source_id);
    this.set(
      'lineageId',
      this.paramsFor('record.show.edit.lineage.lineageobject').lineage_id
    );

    return this.setupModel();
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controllerFor('record.show.edit').setProperties({
      onCancel: this.setupModel,
      cancelScope: this,
    });
  },

  setupModel() {
    let sourceId = this.sourceId;
    let lineageId = this.lineageId;
    let model = this.modelFor('record.show.edit');
    let sources = model.get(
      'json.metadata.resourceLineage.' + lineageId + '.source'
    );
    let source =
      sourceId && isArray(sources) ? sources.get(sourceId) : undefined;

    //make sure the identifier exists
    if (isEmpty(source)) {
      this.flashMessages.warning('No source found! Re-directing...');
      this.replaceWith('record.show.edit.lineage.lineageobject');

      return;
    }

    return source;
  },
  actions: {
    parentModel() {
      return this.modelFor('record.show.edit');
    },
  },
});
