export function initialize(appInstance) {
  appInstance.inject('route', 'settings', 'service:settings');
  appInstance.inject('controller', 'settings', 'service:settings');
}

export default {
  name: 'settings',
  initialize,
};
