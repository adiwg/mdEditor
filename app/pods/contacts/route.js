import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('contact');
  },

  actions: {
    deleteItem: function(item) {
      let message =
          "Do you really want to delete this contact?\n\n" +
          "Be sure this contact is not referenced by a metadata record or dictionary " +
          "or it's deletion may cause those records to not validate.";
      this._deleteItem(item, message);
    },

    editItem: function(item) {
      this.transitionTo('contact.show.edit', item);
    }
  },
  
  // action methods 
  _deleteItem(item, message) {
    if (window.confirm(message)) {
      item.destroyRecord();
    }
  }
  
});
