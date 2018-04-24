import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';
const {
  Route,
  get,
  getWithDefault,
  set
} = Ember;

export default Route.extend(ScrollTo, {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata.resourceInfo');
    set(model, 'timePeriod', getWithDefault(model, 'timePeriod', {}));
    set(model, 'pointOfContact', getWithDefault(model, 'pointOfContact', []));
    set(model, 'status', getWithDefault(model, 'status', []));
    set(model, 'credit', getWithDefault(model, 'credit', []));
    set(model, 'resourceType', getWithDefault(model, 'resourceType', []));
    set(model, 'resourceMaintenance', getWithDefault(model, 'resourceMaintenance', []));
    set(model, 'graphicOverview', getWithDefault(model, 'graphicOverview', []));
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
