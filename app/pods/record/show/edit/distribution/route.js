import Route from '@ember/routing/route';
import { get, set, getWithDefault } from '@ember/object';

export default class DistributionRoute extends Route {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata');
    set(model, 'resourceDistribution', getWithDefault(model,
      'resourceDistribution', []));
  }
}