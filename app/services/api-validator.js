import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  settings: service(),

  /**
   * Checks if the mdTranslator API is properly configured
   * @returns {Boolean} true if API is configured, false otherwise
   */
  isApiConfigured() {
    const apiUrl = this.get('settings.data.mdTranslatorAPI');
    return !!(apiUrl && apiUrl.trim() !== '');
  },

  /**
   * Validates API configuration and throws an error if not configured
   * @throws {Error} If API is not configured
   */
  validateApiConfiguration() {
    if (!this.isApiConfigured()) {
      throw new Error(
        'mdTranslator API URL is not configured. Please configure it in Settings.'
      );
    }
  },

  /**
   * Gets the configured API URL or throws an error if not configured
   * @returns {String} The configured API URL
   * @throws {Error} If API is not configured
   */
  getApiUrl() {
    this.validateApiConfiguration();
    return this.get('settings.data.mdTranslatorAPI');
  },
});
