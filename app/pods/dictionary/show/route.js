import Ember from 'ember';

const {
  inject,
  Route,
  get,
  copy
} = Ember;

export default Route.extend({
  flashMessages: inject.service(),

  model: function(params) {
    let rec= this.store.peekRecord('dictionary', params.dictionary_id);
    return rec;
  },

  afterModel(model) {
    const name = model.get('title');

    const crumb = {
      title: name
    };

    this.set('breadCrumb', crumb);
  },

  actions: {
    destroyDictionary: function() {
      let model = this.currentRouteModel();
      model
        .destroyRecord()
        .then(() => {
          get(this, 'flashMessages')
            .success(`Deleted Dictionary: ${model.get('title')}`);
          this.replaceWith('dictionaries');
        });
    },

    copyDictionary: function() {

      get(this, 'flashMessages')
        .success(`Copied Dictionary: ${this.currentRouteModel().get('title')}`);
      this.transitionTo('dictionary.new.id', copy(this.currentRouteModel()));
    }
  }
});
