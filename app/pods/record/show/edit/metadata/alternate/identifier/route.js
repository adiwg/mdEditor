import Route from '@ember/routing/route';
import { get } from '@ember/object';
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
    let identifierId = get(this, 'identifierId');
    let model = this.modelFor('record.show.edit.metadata.alternate');
    let identifiers = get(model, 'identifier');
    let identifier = identifierId && isArray(identifiers) ? identifiers.get(identifierId) : undefined;

    //make sure the identifier exists
    if (isEmpty(identifier)) {
      get(this, 'flashMessages')
        .warning('No identifier found! Re-directing to Alternate Metadata...');
      this.replaceWith('record.show.edit.metadata.alternate');

      return;
    }

    return identifier;
  },
  actions: {
    goBack(){
      this.transitionTo('record.show.edit.metadata.alternate');
    }
  }
});
