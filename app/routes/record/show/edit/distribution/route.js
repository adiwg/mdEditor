import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default Route.extend({
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata');
    set(
      model,
      'resourceDistribution',
      get(model, 'resourceDistribution') !== undefined
        ? get(model, 'resourceDistribution')
        : [],
    );
  },
});
