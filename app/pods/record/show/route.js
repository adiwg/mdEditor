import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { copy } from 'ember-copy';

export default class ShowRoute extends Route {
  @service store;
  @service flashMessages;
  @service router;
  //breadCrumb: {},
  afterModel(model) {
    if (!model) {
      return;
    }

    const name = model.get('title');

    const crumb = {
      title: name
    };

    this.set('breadCrumb', crumb);
  }
  model(params) {
    let record = this.store.peekRecord('record', params.record_id);

    if (record) {
      return record;
    }

    // Fallback to findRecord if not in cache
    return this.store.findRecord('record', params.record_id);
  }

  @action
  destroyRecord() {
    let model = this.currentRouteModel();
    model
      .destroyRecord()
      .then(() => {
        this.flashMessages
          .success(`Deleted Record: ${model.get('title')}`);
        this.router.replaceWith('records');
      });
  }

  @action
  copyRecord() {
    this.flashMessages
      .success(
        `Copied Record: ${this.currentRouteModel().get('title')}`);
    this.router.transitionTo('record.new.id', copy(this.currentRouteModel()));
  }
}