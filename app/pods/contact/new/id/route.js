import { NotFoundError } from '@ember-data/adapter/error';
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import RouteExtensionMixin from '../../../../mixins/route-extension';

export default class IdRoute extends Route.extend(RouteExtensionMixin) {
  /**
   * The breadcrumb title string.
   *
   * @property breadCrumb
   * @type {String}
   * @default null
   */
  breadCrumb = null;

  /**
   * The route model
   *
   * @method model
   * @param {Object} params
   * @chainable
   * @return {Object}
   */
  async model(params) {
    let record = this.store.peekRecord('contact', params.contact_id);

    if (record) {
      record.set('contactId', record.get('uuid'));
      return record;
    }

    return this.store
      .findRecord('contact', params.contact_id)
      .then((record) => {
        record.set('contactId', record.get('uuid'));
        return record;
      });
  }

  /**
   * Called when route is deactivated.
   * The model is destroyed if still "new".
   *
   * @method deactivate
   */
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

  setupController(controller, model) {
    // Call super for default behavior
    super.setupController(controller, model);

    // // setup tests for required attributes
    // controller.noId = Ember.computed('model.json.contactId', function () {
    //   return model.get('json.contactId') ? false : true;
    // });
    // controller.noName = Ember.computed('model.json.individualName',
    //   'model.json.organizationName',
    //   function () {
    //     let haveIndividual = model.get('json.individualName') ? true :
    //       false;
    //     let haveOrganization = model.get('json.organizationName') ?
    //       true : false;
    //     return !(haveIndividual || haveOrganization);
    //   });
    // controller.allowSave = Ember.computed('noId', 'noName', function () {
    //   return(this.get('noName') || this.get('noId'));
    // });
  }

  // serialize(model) {
  //   // If we got here without an ID (and therefore without a model)
  //   // Ensure that we leave the route param in the URL blank (not 'undefined')
  //   if(!model) {
  //     return {
  //       contact_id: ''
  //     };
  //   }
  //
  //   // Otherwise, let Ember handle it as usual
  //   return super.serialize(...arguments);
  // }

  @action
  willTransition(transition) {
    if (transition.targetName === 'contact.new.index') {
      transition.abort();
      return true;
    }

    // We grab the model loaded in this route
    var model = this.currentRouteModel();
    // If we are leaving the Route we verify if the model is in
    // 'isNew' state, which means it wasn't saved to the backend.
    if (model && model.get('isNew')) {
      //let contexts = transition.intent.contexts;
      // We call DS#destroyRecord() which removes it from the store
      model.destroyRecord().then(() => transition.retry());
      //transition.abort();

      // if (contexts && contexts.length > 0) {
      //   //grab any models ids and apply them to transition
      //   let ids = contexts.mapBy('id');
      //   this.replaceWith(transition.targetName, ...ids);
      //   return true;
      // }
      //
      // this.replaceWith(transition.targetName);
      return true;
    }
  }

  @action
  saveContact() {
    this.currentRouteModel()
      .save()
      .then((model) => {
        this.replaceWith('contact.show.edit', model);
      });
  }

  @action
  cancelContact() {
    this.replaceWith('contacts');

    return false;
  }

  @action
  error(error) {
    if (error instanceof NotFoundError) {
      this.flashMessages.warning(
        'No contact found! Re-directing to new contact...'
      );
      // redirect to new
      this.replaceWith('contact.new');
    } else {
      // otherwise let the error bubble
      return true;
    }
  }
}
