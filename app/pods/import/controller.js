import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ImportController extends Controller {
  @action
  closePreview() {
    this.model?.set?.('preview', false);
  }

  @action
  cancelImport() {
    this.model?.set?.('files', false);
  }
}
