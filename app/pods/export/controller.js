import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ExportController extends Controller {
  @service
  store;

  // Actions migrated from route
  @action
  getColumns(type) {
    return this.model.route.getColumns(type);
  }

  @action
  setScrollTo(value) {
    this.set('scrollTo', value);
  }

  @action
  exportData() {
    return this.model.route.exportData();
  }

  @action
  exportSelectedData(asMdjson) {
    return this.model.route.exportSelectedData(asMdjson);
  }
}
