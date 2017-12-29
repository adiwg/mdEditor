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

  actions: {
    saveDictionary: function() {
      let model = this.currentRouteModel();

      model
        .save()
        .then(() => {
          //this.refresh();
          //this.setModelHash();
          get(this, 'flashMessages')
            .success(`Saved Dictionary: ${model.get('title')}`);

          //this.transitionTo('contacts');
        });
    },

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

    cancelDictionary: function() {
      let model = this.currentRouteModel();
      let message = `Cancelled changes to Dictionary: ${model.get('title')}`;

      if (this.get('settings.data.autoSave')) {
        let json = model.get('jsonRevert');

        if (json) {
          model.set('json', JSON.parse(json));
          get(this, 'flashMessages').warning(message);
        }

        return;
      }

      model
        .reload()
        .then(() => {
          get(this, 'flashMessages').warning(message);
        });
    },

    copyDictionary: function() {

      get(this, 'flashMessages')
        .success(`Copied Dictionary: ${this.currentRouteModel().get('title')}`);
      this.transitionTo('dictionary.new.id', copy(this.currentRouteModel()));
    }
  }
});
