import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ImportController extends Controller {
  @service
  flashMessages;

  @service
  settings;

  // Actions migrated from route
  @action
  readData(file) {
    return this.model.route.readData(file);
  }

  @action
  handleFileInput(queue, event) {
    return this.model.route.handleFileInput(queue, event);
  }

  @action
  triggerFileInput() {
    return this.model.route.triggerFileInput();
  }

  @action
  readFromUri() {
    return this.model.route.readFromUri();
  }

  @action
  getIcon(type) {
    return this.model.route.getIcon(type);
  }

  @action
  getColumns(key) {
    return this.model.route.getColumns(key);
  }

  @action
  setScrollTo(value) {
    this.set('scrollTo', value);
  }

  @action
  goToSettings() {
    return this.model.route.goToSettings();
  }

  @action
  importData() {
    return this.model.route.importData();
  }

  @action
  closePreview() {
    return this.model.route.closePreview();
  }

  @action
  cancelImport() {
    return this.model.route.cancelImport();
  }

  @action
  showPreview(model) {
    return this.model.route.showPreview(model);
  }
}
