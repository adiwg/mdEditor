import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  publish: service('publish'),
  model: function () {
    return this.get('publish.catalogs');
  }
});
