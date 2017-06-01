import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    editCitation(){
      this.transitionTo('record.show.edit.main.citation');
    }
  }
});
