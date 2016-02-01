import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return {
      id: params.dictionary_id
    };
  }
});
