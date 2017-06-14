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
  },
});
