import Ember from 'ember';
const {
  Route
} = Ember;

export default Route.extend({
  queryParams: {
    foo: true,
    scrollToId:true
  },

  actions: {
    editCitation(scrollId) {
      this.transitionTo('record.show.edit.main.citation');

      if(scrollId) {
        this.controller.set('scrollToId', scrollId);
      }
    }
  }
});
