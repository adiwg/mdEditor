import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { set, get } from '@ember/object';
import { inject as service } from '@ember/service';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { formatCitation } from 'mdeditor/pods/components/object/md-citation/component';

export default class IndexRoute extends Route.extend(ScrollTo) {
  @service router;

  model() {
    return this.modelFor('record.show.edit');
  }

  afterModel(m) {
    super.afterModel(...arguments);

    if (!m || !get(m, 'json.metadata')) {
      return;
    }

    let resourceInfo = get(m, 'json.metadata.resourceInfo');
    if (!resourceInfo) {
      set(m, 'json.metadata.resourceInfo', {});
      resourceInfo = get(m, 'json.metadata.resourceInfo');
    }

    set(resourceInfo, 'timePeriod', get(resourceInfo, 'timePeriod') ?? {});
    set(
      resourceInfo,
      'defaultResourceLocale',
      get(resourceInfo, 'defaultResourceLocale') ?? {}
    );
    set(resourceInfo, 'pointOfContact', get(resourceInfo, 'pointOfContact') ?? []);
    set(resourceInfo, 'status', get(resourceInfo, 'status') ?? []);
    set(resourceInfo, 'citation', get(resourceInfo, 'citation') ?? formatCitation({}));
    set(resourceInfo, 'credit', get(resourceInfo, 'credit') ?? []);
    set(resourceInfo, 'resourceType', get(resourceInfo, 'resourceType') ?? []);
    set(resourceInfo, 'resourceMaintenance', get(resourceInfo, 'resourceMaintenance') ?? []);
    set(resourceInfo, 'graphicOverview', get(resourceInfo, 'graphicOverview') ?? []);
  }
  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('model', model);

    this.controllerFor('record.show.edit').setProperties({
      onCancel: () => this,
      cancelScope: this,
    });
  }

  @action
  editCitation(scrollTo) {
    this.router.transitionTo('record.show.edit.main.citation').then(
      function () {
        this.setScrollTo(scrollTo);
      }.bind(this)
    );
  }

  @action
  editId() {
    this.router.transitionTo('record.show.edit.metadata.identifier', {
      queryParams: {
        scrollTo: 'identifier',
      },
    });
  }
}
