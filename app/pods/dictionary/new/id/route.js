import { NotFoundError } from '@ember-data/adapter/error';
import { computed } from '@ember/object';
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IdRoute extends Route {
  @service store;
  @service flashMessages;
  async model(params) {
    let record = this.store.peekRecord('dictionary', params.dictionary_id);

    if (record) {
      record.set('dictionaryId', record.get('uuid'));
      return record;
    }

    return this.store.findRecord('dictionary', params.dictionary_id).then((record) => {
      record.set('dictionaryId', record.get('uuid'));
      return record;
    });
  }

  breadCrumb = null;

  deactivate() {
    // We grab the model loaded in this route
    let model = this.currentRouteModel();

    // If we are leaving the Route we verify if the model is in
    // 'isDeleted' state, which means it wasn't saved to the metadata.
    if(model && model.isDeleted) {
      // We call DS#unloadRecord() which removes it from the store
      this.store.unloadRecord(model);
    }
  }
  //some test actions
  setupController(controller, model) {
    // Call super for default behavior
    super.setupController(controller, model);

    // setup tests for required attributes
    controller.noName = computed(
      'model.json.dataDictionary.citation.title', function() {
        return model.get('json.dataDictionary.citation.title') ? false : true;
      });
    controller.noType = computed(
      'model.json.dataDictionary.resourceType', function() {
        return model.get('json.dataDictionary.resourceType') ? false : true;
      });
    controller.allowSave = computed('noType', 'noName', function () {
      return this.noName || this.noType;
    });

  }
  // serialize(model) {
  //   // If we got here without an ID (and therefore without a model)
  //   // Ensure that we leave the route param in the URL blank (not 'undefined')
  //   if(!model) {
  //     return {
  //       dictionary_id: ''
  //     };
  //   }
  //
  //   // Otherwise, let Ember handle it as usual
  //   return super.serialize.apply(this, arguments);
  // }

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
    if(error instanceof NotFoundError) {
      this.flashMessages
        .warning('No dictionary found! Re-directing to new record...');
      // redirect to new
      this.replaceWith('dictionary.new');
    } else {
      // otherwise let the error bubble
      return true;
    }
  }
}