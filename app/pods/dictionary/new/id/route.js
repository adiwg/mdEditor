import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { NotFoundError } from '@ember-data/adapter/error';
import Route from '@ember/routing/route';

@classic
export default class IdRoute extends Route {
  model(params) {
    let record = this.store.peekRecord('dictionary', params.dictionary_id);

    if (record) {
      return record;
    }

    return this.store.findRecord('dictionary', params.dictionary_id);
  }

  breadCrumb = null;

  deactivate() {
    // We grab the model loaded in this route
    let model = this.currentRouteModel();

    // If we are leaving the Route we verify if the model is in
    // 'isDeleted' state, which means it wasn't saved to the metadata.
    if (model && model.isDeleted) {
      // We call DS#unloadRecord() which removes it from the store
      this.store.unloadRecord(model);
    }
  }

  //some test actions
  setupController(controller, model) {
    // Call _super for default behavior
    super.setupController(controller, model);

    // setup tests for required attributes
    controller.noName = computed(
      'model.json.dataDictionary.citation.title',
      function () {
        return model.get('json.dataDictionary.citation.title') ? false : true;
      }
    );
    controller.noType = computed(
      'model.json.dataDictionary.resourceType',
      function () {
        return model.get('json.dataDictionary.resourceType') ? false : true;
      }
    );
    controller.allowSave = computed.or('noName', 'noType');
  }

  @action
  willTransition(transition) {
    if (transition.targetName === 'dictionary.new.index') {
      transition.abort();
      return true;
    }

    // We grab the model loaded in this route
    var model = this.currentRouteModel();
    // If we are leaving the Route we verify if the model is in
    // 'isNew' state, which means it wasn't saved to the backend.
    if (model && model.get('isNew')) {
      // We call DS#destroyRecord() which removes it from the store
      model.destroyRecord().then(() => transition.retry());

      return true;
    }
  }

  @action
  saveDictionary() {
    this.currentRouteModel()
      .save()
      .then((model) => {
        this.replaceWith('dictionary.show.edit', model);
      });
  }

  @action
  cancelDictionary() {
    this.replaceWith('dictionaries');

    return false;
  }

  @action
  error(error) {
    if (error instanceof NotFoundError) {
      this.flashMessages.warning(
        'No dictionary found! Re-directing to new record...'
      );
      // redirect to new
      this.replaceWith('dictionary.new');
    } else {
      // otherwise let the error bubble
      return true;
    }
  }
}
