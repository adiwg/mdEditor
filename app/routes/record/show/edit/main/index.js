import Route from '@ember/routing/route';
import { set, get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { formatCitation } from '../../../../../components/object/md-citation/component';

export default Route.extend(ScrollTo, {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata.resourceInfo');
    set(
      model,
      'timePeriod',
      get(model, 'timePeriod') !== undefined ? get(model, 'timePeriod') : {},
    );
    set(
      model,
      'defaultResourceLocale',
      get(model, 'defaultResourceLocale') !== undefined
        ? get(model, 'defaultResourceLocale')
        : {},
    );
    set(
      model,
      'pointOfContact',
      get(model, 'pointOfContact') !== undefined
        ? get(model, 'pointOfContact')
        : [],
    );
    set(
      model,
      'status',
      get(model, 'status') !== undefined ? get(model, 'status') : [],
    );
    set(
      model,
      'citation',
      get(model, 'citation') !== undefined
        ? get(model, 'citation')
        : formatCitation({}),
    );
    set(
      model,
      'credit',
      get(model, 'credit') !== undefined ? get(model, 'credit') : [],
    );
    set(
      model,
      'resourceType',
      get(model, 'resourceType') !== undefined
        ? get(model, 'resourceType')
        : [],
    );
    set(
      model,
      'resourceMaintenance',
      get(model, 'resourceMaintenance') !== undefined
        ? get(model, 'resourceMaintenance')
        : [],
    );
    set(
      model,
      'graphicOverview',
      get(model, 'graphicOverview') !== undefined
        ? get(model, 'graphicOverview')
        : [],
    );
  },

  setupController(controller, model) {
    this._super(controller, model);

    this.controllerFor('record.show.edit').setProperties({
      onCancel: () => this,
      cancelScope: this,
    });
  },

  actions: {
    editCitation(scrollTo) {
      this.transitionTo('record.show.edit.main.citation').then(
        function () {
          this.setScrollTo(scrollTo);
        }.bind(this),
      );
    },
    editId() {
      this.transitionTo('record.show.edit.metadata.identifier', {
        queryParams: {
          scrollTo: 'identifier',
        },
      });
    },
  },
});
