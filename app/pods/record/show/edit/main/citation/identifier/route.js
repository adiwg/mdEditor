import Ember from 'ember';
const {
  Route,
  get,
  isEmpty,
  isArray
} = Ember;

export default Route.extend({
  model(params) {
    this.set('identifierId', params.identifier_id);

    return this.setupModel();
  },

  setupModel() {
    let identifierId = get(this, 'identifierId');
    let model = this.modelFor('record.show.edit.main');
    let identifiers = model.get('json.metadata.resourceInfo.citation.identifier');
    let identifier = isArray(identifiers) ? identifiers.get(identifierId) : undefined;

    //make sure the identifier exists
    if (isEmpty(identifier)) {
      Ember.get(this, 'flashMessages')
        .warning('No identifier found! Re-directing to citation...');
      this.replaceWith('record.show.edit.main.citation');

      return;
    }

    return identifier;
  }
});
