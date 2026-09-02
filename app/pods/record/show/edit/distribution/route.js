import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { A } from '@ember/array';

export default class DistributionRoute extends Route {
  afterModel(m) {
    super.afterModel(...arguments);

    let model = m.json.metadata;
    let distributions = model.resourceDistribution;

    if (!distributions) {
      set(model, 'resourceDistribution', A([]));
    } else if (typeof distributions.pushObject !== 'function') {
      set(model, 'resourceDistribution', A(distributions));
    }
  }
}
