import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default class ExtentRoute extends Route {
  model() {
    let model = this.modelFor('record.show.edit');
    let json = model.get('json');
    let resourceInfo = json.metadata.resourceInfo;

    set(resourceInfo, 'extent', get(resourceInfo, 'extent') ?? []);

    return model;
  }
}
