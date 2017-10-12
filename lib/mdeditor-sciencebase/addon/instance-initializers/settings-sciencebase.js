export function initialize(instance) {
  // appInstance.inject('route', 'foo', 'service:foo');
  let service = instance.lookup('service:publish');

  service.get('catalogs').pushObject({
    name: 'ScienceBase',
    route: 'sciencebase',
    description: 'ScienceBase is a collaborative scientific data and information management platform'
  });
}


export default {
  initialize
};
