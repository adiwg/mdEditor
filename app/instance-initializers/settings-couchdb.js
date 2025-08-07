import config from '../utils/couchdb-config';

export function initialize(instance) {
  let service = instance.lookup('service:publish');
  service.get('catalogs').pushObject(config);
}

export default {
  initialize
};
