import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    editIdentifier(index){
      this.transitionTo('record.show.edit.main.citation.identifier', index);

    }
  }
});
