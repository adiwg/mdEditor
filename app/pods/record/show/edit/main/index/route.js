import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { set, get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import {
  formatCitation
} from 'mdeditor/pods/components/object/md-citation/component';

export default class IndexRoute extends Route.extend(ScrollTo) {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata.resourceInfo');
    set(model, 'timePeriod', get(model, 'timePeriod') ?? {});
    set(model, 'defaultResourceLocale', get(model, 'defaultResourceLocale') ?? {});
    set(model, 'pointOfContact', get(model, 'pointOfContact') ?? []);
    set(model, 'status', get(model, 'status') ?? []);
    set(model, 'citation', get(model, 'citation') ?? formatCitation({}));
    set(model, 'credit', get(model, 'credit') ?? []);
    set(model, 'resourceType', get(model, 'resourceType') ?? []);
    set(model, 'resourceMaintenance', get(model, 'resourceMaintenance') ?? []);
    set(model, 'graphicOverview', get(model, 'graphicOverview') ?? []);
  }
  setupController(controller, model) {
    this._super(controller, model);

    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: () => this,
        cancelScope: this
      });
  }

  @action
  editCitation(scrollTo) {
    this.transitionTo('record.show.edit.main.citation')
      .then(function () {
        this.setScrollTo(scrollTo);
      }.bind(this));
  }

  @action
  editId() {
    this.transitionTo('record.show.edit.metadata.identifier', {
      queryParams: {
        scrollTo: 'identifier'
      }
    });
  }
}