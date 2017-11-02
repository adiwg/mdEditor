import Ember from 'ember';

const {
  Route,
  inject: {
    service
  }
} = Ember;

export default Route.extend({
  slider: service(),
  model() {
    return this.store.peekAll('contact');
  },

  actions: {
    deleteItem(item) {

      this._deleteItem(item);
    },

    editItem(item) {
      this.transitionTo('contact.show.edit', item);
    },

    showSlider(rec) {
      let slider = this.get('slider');

      this.controller.set('errorTarget', rec);
      slider.set('fromName', 'md-slider-error');
      slider.toggleSlider(true);
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
