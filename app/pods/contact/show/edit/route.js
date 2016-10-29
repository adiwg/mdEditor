import Ember from 'ember';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),

  renderTemplate() {
    this.render('contact.show.edit', {
      into: 'contact'
    });
  },

  actions: {
    saveContact: function () {
      let model = this.currentModel;
      model
        .save()
        .then(() => {
          Ember.get(this, 'flashMessages')
            .success(`Saved Contact: ${model.get('title')}`);
          //this.transitionTo('contacts');
        });
    },

    destroyContact: function () {
      let model = this.currentModel;
      model
        .destroyRecord()
        .then(() => {
          Ember.get(this, 'flashMessages')
            .success(`Deleted Contact: ${model.get('title')}`);
          this.replaceWith('contacts');
        });
    },

    cancelContact: function () {
      let model = this.currentModel;
      model
        .reload()
        .then(() => {
          Ember.get(this, 'flashMessages')
            .warning(
              `Cancelled changes to Contact: ${model.get('title')}`);
          //this.transitionTo('contacts');
        });
    },

    copyContact: function () {

      Ember.get(this, 'flashMessages')
        .success(`Copied Contact: ${this.currentModel.get('title')}`);
      this.transitionTo('contact.new.id', Ember.copy(this.currentModel));
    }
  }
});
