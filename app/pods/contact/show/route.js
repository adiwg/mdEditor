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
    let rec= this.store.peekRecord('contact', params.contact_id);
    return rec;
  },

  actions: {
    saveContact: function() {
      let model = this.currentRouteModel();

      model
        .save()
        .then(() => {
          //this.refresh();
          //this.setModelHash();
          get(this, 'flashMessages')
            .success(`Saved Contact: ${model.get('title')}`);

          //this.transitionTo('contacts');
        });
    },

    destroyContact: function() {
      let model = this.currentRouteModel();
      model
        .destroyRecord()
        .then(() => {
          get(this, 'flashMessages')
            .success(`Deleted Contact: ${model.get('title')}`);
          this.replaceWith('contacts');
        });
    },

    cancelContact: function() {
      let model = this.currentRouteModel();
      let message = `Cancelled changes to Contact: ${model.get('title')}`;

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

    copyContact: function() {

      get(this, 'flashMessages')
        .success(`Copied Contact: ${this.currentRouteModel().get('title')}`);
      this.transitionTo('contact.new.id', copy(this.currentRouteModel()));
    }
  }
});
