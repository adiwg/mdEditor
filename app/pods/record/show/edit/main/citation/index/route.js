import Ember from 'ember';

const {
  Route,
  get,
  getWithDefault,
  set
} = Ember;

export default Route.extend({
  afterModel() {
    this.setupModel();
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel
      });
  },

  setupModel() {
    let model = this.currentRouteModel();
    let citation = get(model, 'json.metadata.resourceInfo.citation');

    set(citation, 'responsibleParty', getWithDefault(citation,
      'responsibleParty', []));
    set(citation, 'presentationForm', getWithDefault(citation,
      'presentationForm', []));
    set(citation, 'onlineResource', getWithDefault(citation,
      'onlineResource', []));
    set(citation, 'identifier', getWithDefault(citation, 'identifier', []));
    set(citation, 'graphic', getWithDefault(citation, 'graphic', []));
    set(citation, 'series', getWithDefault(citation, 'series', {}));
  },

  actions: {
    editIdentifier(index) {
      this.transitionTo('record.show.edit.main.citation.identifier', index);

    }
  }
});
