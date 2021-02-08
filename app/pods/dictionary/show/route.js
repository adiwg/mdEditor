import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { copy } from 'ember-copy';
import classic from 'ember-classic-decorator';

@classic
export default class DictionaryShow extends Route {
  @service flashMessages;

  model(params) {
    let rec = this.store.peekRecord('dictionary', params.dictionary_id);
    return rec;
  }

  afterModel(model) {
    const name = model.get('title');

    const crumb = {
      title: name,
    };

    this.set('breadCrumb', crumb);
  }

  actions = {
    destroyDictionary() {
      let model = this.currentRouteModel();
      model.destroyRecord().then(() => {
        this.flashMessages.success(`Deleted Dictionary: ${model.get('title')}`);
        this.replaceWith('dictionaries');
      });
    },

    copyDictionary() {
      this.flashMessages.success(
        `Copied Dictionary: ${this.currentRouteModel().get('title')}`
      );
      this.transitionTo('dictionary.new.id', copy(this.currentRouteModel()));
    },
  };
}
