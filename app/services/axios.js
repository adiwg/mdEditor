import Service from '@ember/service';
import axios from 'axios';

export default class AxiosService extends Service {
  /**
   * Make an HTTP request using axios
   * @param {string} url - The URL to request
   * @param {Object} options - Request options
   * @returns {Promise} - Axios promise
   */
  request(url, options = {}) {
    // Map ember-ajax options to axios options
    const axiosOptions = {
      method: options.type || options.method || 'GET',
      url: url,
      crossDomain: options.crossDomain,
      timeout: options.timeout,
    };

    // Handle data
    if (options.data) {
      if (axiosOptions.method.toLowerCase() === 'get') {
        axiosOptions.params = options.data;
      } else {
        axiosOptions.data = options.data;
      }
    }

    // Handle content type
    if (options.contentType) {
      axiosOptions.headers = axiosOptions.headers || {};
      axiosOptions.headers['Content-Type'] = options.contentType;
    }

    // Handle response type
    if (options.dataType) {
      if (options.dataType === 'text') {
        axiosOptions.responseType = 'text';
      } else if (options.dataType === 'json') {
        axiosOptions.responseType = 'json';
      }
    }

    return axios(axiosOptions)
      .then((response) => {
        // ember-ajax returns just the response data
        return response.data;
      })
      .catch((error) => {
        // Re-throw with similar error structure
        throw error;
      });
  }

  /**
   * Convenience method for GET requests
   */
  get(url, options = {}) {
    return this.request(url, { ...options, type: 'GET' });
  }

  /**
   * Convenience method for POST requests
   */
  post(url, data, options = {}) {
    return this.request(url, { ...options, type: 'POST', data });
  }

  /**
   * Convenience method for PUT requests
   */
  put(url, data, options = {}) {
    return this.request(url, { ...options, type: 'PUT', data });
  }

  /**
   * Convenience method for DELETE requests
   */
  delete(url, options = {}) {
    return this.request(url, { ...options, type: 'DELETE' });
  }
}
