import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class SettingsMainController extends Controller {
  @service settings;

  @action
  deriveItisProxyUrl() {
    const mdTranslatorAPI = this.model.get('mdTranslatorAPI');
    if (mdTranslatorAPI) {
      const baseUrl = mdTranslatorAPI.replace(/\/api\/v\d+(\/translator)?$/, '');
      this.model.set('itisProxyUrl', baseUrl);
    }
  }
}
