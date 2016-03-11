import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.createRecord('contact');
  },
  deactivate: function () {
    // We grab the model loaded in this route
    var model = this.modelFor('contact/new');

    // If we are leaving the Route we verify if the model is in
    // 'isNew' state, which means it wasn't saved to the backend.
    if (model.get('isNew')) {
      // We call DS#destroyRecord() which removes it from the store
      model.destroyRecord();
    }
  }
});
