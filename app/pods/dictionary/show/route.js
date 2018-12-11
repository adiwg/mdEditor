import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { copy } from '@ember/object/internals';

export default Route.extend({
  flashMessages: service(),

  model: function(params) {
    let rec= this.store.peekRecord('dictionary', params.dictionary_id);
    return rec;
  },

  afterModel(model) {
    const name = model.get('title');

    const crumb = {
      title: name
    };

    this.set('breadCrumb', crumb);
  },

  actions: {
    destroyDictionary: function() {
      let model = this.currentRouteModel();
      model
        .destroyRecord()
        .then(() => {
          this.flashMessages
            .success(`Deleted Dictionary: ${model.get('title')}`);
          this.replaceWith('dictionaries');
        });
    },

    copyDictionary: function() {

      this.flashMessages
        .success(`Copied Dictionary: ${this.currentRouteModel().get('title')}`);
      this.transitionTo('dictionary.new.id', copy(this.currentRouteModel()));
    }
  }
});
