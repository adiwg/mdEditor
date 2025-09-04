import Route from '@ember/routing/route';

export default class ShowRoute extends Route {
  //breadCrumb: {};

  /**
   * Get the current route's model
   * @returns {*} The model for this route
   */
  currentRouteModel() {
    return this.modelFor(this.routeName);
  }

  afterModel(model) {
    if (model) {
      const name = model.get('title');

      const crumb = {
        title: name,
      };

      this.set('breadCrumb', crumb);
    }
  }

  model(params) {
    return this.store.findRecord('record', params.record_id);
  }
}
