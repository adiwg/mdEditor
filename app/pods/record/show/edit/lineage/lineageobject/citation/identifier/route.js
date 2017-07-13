import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';

const {
  Route,
  get,
  isEmpty,
  isArray
} = Ember;

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
        onCancel: this.setupModel
      });
  },

  setupModel() {
    let identifierId = get(this, 'identifierId');
    let model = this.modelFor('record.show.edit.lineage.lineageobject.citation');
    let identifiers = get(model, 'identifier');
    let identifier = identifierId && isArray(identifiers) ? identifiers.get(identifierId) : undefined;

    //make sure the identifier exists
    if (isEmpty(identifier)) {
      Ember.get(this, 'flashMessages')
        .warning('No identifier found! Re-directing to Citation...');
      this.replaceWith('record.show.edit.lineage.lineageobject.citation');

      return;
    }

    return identifier;
  },
  actions: {
    goBack(){
      this.transitionTo('record.show.edit.lineage.lineageobject.citation');
    }
  }
});
