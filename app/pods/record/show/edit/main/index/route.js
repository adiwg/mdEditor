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
    set(model, 'timePeriod', getWithDefault(model, 'timePeriod', {}));
    set(model, 'defaultResourceLocale', getWithDefault(model,
      'defaultResourceLocale', {}));
    set(model, 'pointOfContact', getWithDefault(model, 'pointOfContact', []));
    set(model, 'status', getWithDefault(model, 'status', []));
    set(model, 'citation', getWithDefault(model, 'citation', formatCitation({})));
    set(model, 'credit', getWithDefault(model, 'credit', []));
    set(model, 'resourceType', getWithDefault(model, 'resourceType', []));
    set(model, 'resourceMaintenance', getWithDefault(model,
      'resourceMaintenance', []));
    set(model, 'graphicOverview', getWithDefault(model, 'graphicOverview',
      []));
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
