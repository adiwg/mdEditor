import { NotFoundError } from '@ember-data/adapter/error';
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IdRoute extends Route {
  @service store;
  @service flashMessages;
  @service router;
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
   * The breadcrumb title string.
   *
   * @property breadCrumb
   * @type {String}
   * @default null
   */
  breadCrumb = null;

  /**
   * Called when route is deactivated.
   * The model is destroyed if still "new".
   *
   * @method deactivate
   */
  deactivate() {
    // Post-save navigation - model.isDeleted/isNew can't be trusted here,
    // both are backed by ember-data 5.x's warp-drive RecordState/@gate
    // machinery, which breaks under classic Ember .extend() (same root
    // cause as the "memoSignal is not a function" bug elsewhere in this
    // app - see record/new/id/route.js's willTransition for the fuller
    // writeup). Without this, a successful save could still get its own
    // record unloaded right as this route deactivates.
    if (this._justSaved) {
      return;
    }

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
      // We call DS#unloadRecord() which removes it from the store
      this.store.unloadRecord(model);
    }
  }

  setupController(controller, model) {
    super.setupController(controller, model);
  }

  @action
  willTransition() {
    return true;
  }

  @action
  saveContact(event) {
    event?.preventDefault();

    this.currentRouteModel()
      .save()
      .then((model) => {
        this._justSaved = true;
        this.router.replaceWith('contact.show.edit', model);
      });
  }

  @action
  setIsOrganization(isOrganization) {
    let model = this.currentRouteModel();
    let json = model?.json || {};

    model.set('json', { ...json, isOrganization });
  }

  @action
  cancelContact() {
    this.router.replaceWith('contacts');

    return false;
  }

  @action
  error(error) {
    if (error instanceof NotFoundError) {
      this.flashMessages.warning(
        'No contact found! Re-directing to new contact...'
      );
      // redirect to new
      this.router.replaceWith('contact.new');
    } else {
      // otherwise let the error bubble
      return true;
    }
  }
}
