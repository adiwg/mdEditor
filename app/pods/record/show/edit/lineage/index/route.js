import Ember from 'ember';

const {
  Route,
  set,
  getWithDefault,
  get
} = Ember;

export default Route.extend({
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata');
    set(model, 'resourceLineage', getWithDefault(model, 'resourceLineage', []));
  },
  actions: {
    editLineage(id) {
      this.transitionTo('record.show.edit.lineage.lineageobject', id);
    }//,
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
