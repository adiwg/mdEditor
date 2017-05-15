import Ember from 'ember';

export default Ember.Route.extend({
  redirect(model) {
    this.replaceWith('record.show.edit.main', model);
  }
});
