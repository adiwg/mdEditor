import { NotFoundError } from '@ember-data/adapter/error';
import { computed } from '@ember/object';
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IdRoute extends Route {
  @service store;
  @service flashMessages;
  @service router;
  async model(params) {
    let record = this.store.peekRecord('dictionary', params.dictionary_id);

    if (record) {
      record.set('dictionaryId', record.get('uuid'));
      return record;
    }

    return this.store
      .findRecord('dictionary', params.dictionary_id)
      .then((record) => {
        record.set('dictionaryId', record.get('uuid'));
        return record;
      });
  }

  breadCrumb = null;

  deactivate() {
    // We grab the model loaded in this route
    let model = this.currentRouteModel();

    // If we are leaving the Route we verify if the model is in
    // 'isDeleted' or 'isNew' state, which means it wasn't saved.
    if (
      model &&
      (model.isDeleted || model.isNew) &&
      !this.store.isDestroyed &&
      !this.store.isDestroying
    ) {
      this.store.unloadRecord(model);
    }
  }
  //some test actions
  setupController(controller, model) {
    // Call super for default behavior
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
    controller.allowSave = computed('noType', 'noName', function () {
      return this.noName || this.noType;
    });
  }
  @action
  willTransition() {
    return true;
  }

  @action
  saveDictionary(event) {
    event?.preventDefault();

    this.currentRouteModel()
      .save()
      .then((model) => {
        this.router.replaceWith('dictionary.show.edit', model);
      });
  }

  @action
  cancelDictionary() {
    this.router.replaceWith('dictionaries');
    return false;
  }

  @action
  error(error) {
    if (error instanceof NotFoundError) {
      this.flashMessages.warning(
        'No dictionary found! Re-directing to new record...'
      );
      // redirect to new
      this.router.replaceWith('dictionary.new');
    } else {
      // otherwise let the error bubble
      return true;
    }
  }
}
