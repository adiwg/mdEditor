export function initialize(appInstance) {
  appInstance.inject('route', 'profile', 'service:profile');
  appInstance.inject('controller', 'profile', 'service:profile');
  appInstance.inject('component', 'profile', 'service:profile');
}

export default {
  name: 'profile',
  initialize
};
