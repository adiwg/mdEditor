import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import { A } from '@ember/array';

export default class DistributionRoute extends Route {
  afterModel(m) {
    super.afterModel(...arguments);

    let model = get(m, 'json.metadata');
    let distributions = get(model, 'resourceDistribution');

    if (!distributions) {
      set(model, 'resourceDistribution', A([]));
    } else if (typeof distributions.pushObject !== 'function') {
      set(model, 'resourceDistribution', A(distributions));
    }
  }
}
