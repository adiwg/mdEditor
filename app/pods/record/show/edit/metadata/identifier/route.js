import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';

const {
  Route,
  get,
  isEmpty,
  //isArray
} = Ember;

export default Route.extend(ScrollTo, {
  model() {
    return this.setupModel();
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel
      });
  },

  setupModel() {
    let model = this.modelFor('record.show.edit');
    let identifier = get(model,
      'json.metadata.metadataInfo.metadataIdentifier');

    //make sure the identifier exists
    if(isEmpty(identifier)) {
      // Ember.get(this, 'flashMessages')
      //   .warning('No identifier found! Re-directing to metadata...');
      // this.replaceWith('record.show.edit.metadata');
      model.set('json.metadata.metadataInfo.metadataIdentifier', {});
    }

    return identifier;
  }
});
