import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.Object.create({
      id: params.dictionary_id
    });
  }
});
