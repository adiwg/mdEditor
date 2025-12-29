import Service from '@ember/service';
import { inject as service } from '@ember/service';
import ENV from 'mdeditor/config/environment';

export default class DatePickerService extends Service {
  @service settings;

  /**
   * Determines which date picker implementation to use
   * @returns {string} 'modern' - Legacy is no longer available
   */
  get implementation() {
    // Legacy implementation has been removed, always return modern
    return 'modern';
  }

  /**
   * Whether to use the modern jQuery-free date picker
   * @returns {boolean} Always true since legacy is removed
   */
  get useModern() {
    return true;
  }

  /**
   * Whether to use the legacy jQuery-based date picker
   * @returns {boolean} Always false since legacy is removed
   */
  get useLegacy() {
    return false;
  }
}
