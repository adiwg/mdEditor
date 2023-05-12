import Route from '@ember/routing/route';
import { set, getWithDefault, get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import {
  formatCitation
} from 'mdeditor/pods/components/object/md-citation/component';

export default Route.extend(ScrollTo, {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata.resourceInfo');
    set(model, 'timePeriod', (model.timePeriod === undefined ? {} : model.timePeriod));
    set(model, 'defaultResourceLocale', (model.defaultResourceLocale === undefined ? {} : model.defaultResourceLocale));
    set(model, 'pointOfContact', (model.pointOfContact === undefined ? [] : model.pointOfContact));
    set(model, 'status', (model.status === undefined ? [] : model.status));
    set(model, 'citation', (model.citation === undefined ? formatCitation({}) : model.citation));
    set(model, 'credit', (model.credit === undefined ? [] : model.credit));
    set(model, 'resourceType', (model.resourceType === undefined ? [] : model.resourceType));
    set(model, 'resourceMaintenance', (model.resourceMaintenance === undefined ? [] : model.resourceMaintenance));
    set(model, 'graphicOverview', (model.graphicOverview === undefined ? [] : model.graphicOverview));
  },

  setupController(controller, model) {
    this._super(controller, model);

    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: () => this,
        cancelScope: this
      });
  },

  actions: {
    editCitation(scrollTo) {
      this.transitionTo('record.show.edit.main.citation')
        .then(function () {
          this.setScrollTo(scrollTo);
        }.bind(this));
    },
    editId() {
      this.transitionTo('record.show.edit.metadata.identifier', {
        queryParams: {
          scrollTo: 'identifier'
        }
      });
    }
  }
});
