import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { get, set, getWithDefault } from '@ember/object';

@classic
export default class DistributionRoute extends Route {
  afterModel(m) {
    super.afterModel(...arguments);

    let model = get(m, 'json.metadata');
    set(
      model,
      'resourceDistribution',
      getWithDefault(model, 'resourceDistribution', [])
    );
  }
}