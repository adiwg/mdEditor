import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('dictionary');
  },

  actions: {
    deleteItem: function(item) {
      let message =
          "Do you really want to delete this dictionary?\n\n" +
          "Be sure this dictionary is not referenced by an metadata records " +
          "or it's deletion may cause those records to not validate.";
      this._deleteItem(item, message);
    },

    editItem: function(item) {
      this.transitionTo('dictionary.show.edit', item);
    }
  },
  
  // action methods
  _deleteItem(item, message) {
    if (window.confirm(message)) {
      item.destroyRecord();
    }
  }
  
});
