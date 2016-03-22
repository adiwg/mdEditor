import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('contact');
  },

  actions: {
    deleteItem: function(item) {
      if (window.confirm(
              "Do you really want to delete this contact?\n\n" +
              "Be sure this contact is not referenced by a metadata record or dictionary " +
              "or it's deletion may cause those records to not validate.")) {
        item.destroyRecord().then(function() {
          console.log('+-- deleted contact ID:', item.id);
        }, function() {
          console.log('+--- delete contact failed');
        });
      }
    },

    editItem: function(item) {
      this.transitionTo('contact.show.edit', item);
    }
  }

});
