import ENV from 'mdeditor/config/environment';
/* global L */

export function initialize() {
  if (ENV.environment === 'production') {
    L.Icon.Default.imagePath = ENV.rootURL + '/assets/images/';
  }
  if (ENV.environment === 'development') {
    L.Icon.Default.imagePath = '/assets/images/';
  }
}

export default {
  name: 'leaflet',
  initialize,
};
