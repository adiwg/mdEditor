import Ember from 'ember';

const {
  Route,
  getWithDefault,
  get,
  set
} = Ember;

export default Route.extend({
  afterModel(m) {
    this._super(...arguments);

    let model = get(m,'json.metadata.metadataInfo');
    set(model, 'metadataContact', getWithDefault(model, 'metadataContact', []));
    set(model, 'metadataIdentifier', getWithDefault(model, 'metadataIdentifier', {}));
  },

  actions: {
    editIdentifier() {
      this.transitionTo('record.show.edit.metadata.identifier');
    }
  }
});
