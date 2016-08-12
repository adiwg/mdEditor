import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('contact');
  },

  actions: {
    deleteItem(item) {

      this._deleteItem(item);
    },

    editItem(item) {
      this.transitionTo('contact.show.edit', item);
    }
  },

  // action methods
  _deleteItem(item) {
    /*let message =
        `Do you really want to delete this contact?\n\n
        Be sure this contact is not referenced by a metadata record or dictionary
        or it's deletion may cause those records to not validate.`;*/
      item.destroyRecord();
  }

});
