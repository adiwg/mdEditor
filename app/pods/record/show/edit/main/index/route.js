import Route from '@ember/routing/route';
import { set } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { formatCitation } from 'mdeditor/pods/components/object/md-citation/component';

export default class IndexRoute extends Route.extend(ScrollTo) {
  model() {
    return this.modelFor('record.show.edit');
  }

  afterModel(m) {
    super.afterModel(...arguments);

    if (!m || !m.json?.metadata) {
      return;
    }

    let resourceInfo = m.json.metadata.resourceInfo;
    if (!resourceInfo) {
      set(m, 'json.metadata.resourceInfo', {});
      resourceInfo = m.json.metadata.resourceInfo;
    }

    set(resourceInfo, 'timePeriod', resourceInfo.timePeriod ?? {});
    set(
      resourceInfo,
      'defaultResourceLocale',
      resourceInfo.defaultResourceLocale ?? {}
    );
    set(
      resourceInfo,
      'pointOfContact',
      resourceInfo.pointOfContact ?? []
    );
    set(resourceInfo, 'status', resourceInfo.status ?? []);
    set(
      resourceInfo,
      'citation',
      resourceInfo.citation ?? formatCitation({})
    );
    set(resourceInfo, 'credit', resourceInfo.credit ?? []);
    set(resourceInfo, 'resourceType', resourceInfo.resourceType ?? []);
    set(
      resourceInfo,
      'resourceMaintenance',
      resourceInfo.resourceMaintenance ?? []
    );
    set(
      resourceInfo,
      'graphicOverview',
      resourceInfo.graphicOverview ?? []
    );
  }
  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('model', model);

    this.controllerFor('record.show.edit').setProperties({
      onCancel: () => this,
      cancelScope: this,
    });
  }
}
