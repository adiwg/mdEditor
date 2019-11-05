export function initialize(appInstance) {
  //appInstance.inject('route', 'profile', 'service:custom-profile');
  //appInstance.inject('controller', 'profile', 'service:custom-profile');
  appInstance.inject('component', 'profile', 'service:custom-profile');
}

export default {
  name: 'profile',
  initialize
};
