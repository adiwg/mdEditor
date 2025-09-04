import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ImportController extends Controller {
  
  @action
  processData(data) {
    return this.model.route.processData(data);
  }

  @action
  reduceData(data) {
    return this.model.route.reduceData(data);
  }

  @action
  processComplete() {
    return this.model.route.processComplete();
  }

  @action
  goToEntity() {
    return this.model.route.goToEntity();
  }

  @action
  doImport() {
    return this.model.route.doImport();
  }

  @action
  cancelImport() {
    return this.model.route.cancelImport();
  }
}
