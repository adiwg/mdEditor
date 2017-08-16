import Ember from 'ember';

const {
  Route,
  set,
  getWithDefault,
  get,
  NativeArray
} = Ember;

export default Route.extend({
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata');
    set(model, 'funding', NativeArray.apply(getWithDefault(model, 'funding', [])));
  },

  setupController: function() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
  },

  actions: {
    // editResource(id) {
    //   this.transitionTo('record.show.edit.associated.resource', id);
    // } //,
    // templateClass() {
    //   return Ember.Object.extend({
    //     init() {
    //       this._super(...arguments);
    //       //this.set('authority', {});
    //     }
    //   });
    // }
  }
});
