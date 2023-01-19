import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  model(params) {
    this.set('identifierId', params.identifier_id);

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
    let identifierId = this.identifierId;
    let model = this.modelFor('record.show.edit');
    let identifiers = model.get('json.metadata.metadataInfo.parentMetadata.identifier');
    let identifier = identifierId && isArray(identifiers) ? identifiers.get(identifierId) : undefined;

    //make sure the identifier exists
    if (isEmpty(identifier)) {
      this.flashMessages
        .warning('No identifier found! Re-directing to Parent Metadata...');
      this.replaceWith('record.show.edit.metadata.parent.index');

      return;
    }

    return identifier;
  }
});
