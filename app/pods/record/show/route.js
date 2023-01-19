import Route from '@ember/routing/route';
import { copy } from 'ember-copy';

export default Route.extend({
  //breadCrumb: {},
  afterModel(model) {
    const name = model.get('title');

    const crumb = {
      title: name
    };

    this.set('breadCrumb', crumb);
  },
  model(params) {
    return this.store.peekRecord('record', params.record_id);
  },

  actions: {
    destroyRecord: function () {
      let model = this.currentRouteModel();
      model
        .destroyRecord()
        .then(() => {
          this.flashMessages
            .success(`Deleted Record: ${model.get('title')}`);
          this.replaceWith('records');
        });
    },
    copyRecord: function () {

      this.flashMessages
        .success(
          `Copied Record: ${this.currentRouteModel().get('title')}`);
      this.transitionTo('record.new.id', copy(this.currentRouteModel()));
    }
  }
});
