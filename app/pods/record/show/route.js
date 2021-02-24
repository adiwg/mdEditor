import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { copy } from 'ember-copy';

@classic
export default class ShowRoute extends Route {
  //breadCrumb: {},
  afterModel(model) {
    const name = model.get('title');

    const crumb = {
      title: name,
    };

    this.set('breadCrumb', crumb);
  }

  model(params) {
    return this.store.peekRecord('record', params.record_id);
  }

  @action
  destroyRecord() {
    let model = this.currentRouteModel();
    model.destroyRecord().then(() => {
      this.flashMessages.success(`Deleted Record: ${model.get('title')}`);
      this.replaceWith('records');
    });
  }

  @action
  copyRecord() {
    this.flashMessages.success(
      `Copied Record: ${this.currentRouteModel().get('title')}`
    );
    this.transitionTo('record.new.id', copy(this.currentRouteModel()));
  }
}