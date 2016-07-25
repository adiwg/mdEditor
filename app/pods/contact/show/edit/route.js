import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    this.render('contact.show.edit', {
      into: 'contact'
    });
  },

  actions: {
    saveContact: function () {
      this.currentModel
        .save()
        .then(() => {
          this.transitionTo('contacts');
        });
    },

    cancelContact: function () {
      this.currentModel
        .reload()
        .then(() => {
          this.transitionTo('contacts');
        });
    }
  }
});
