import config from "../utils/config";

export function initialize(instance) {
  // appInstance.inject('route', 'foo', 'service:foo');
  let service = instance.lookup("service:publish");

  service.get("catalogs").pushObject(config);
}

export default {
  initialize,
};
