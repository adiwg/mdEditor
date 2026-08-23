import { A as emberArray } from '@ember/array';
import Helper from '@ember/component/helper';
import { computed, get } from '@ember/object';
import { getOwner } from '@ember/application';
import { ACTION } from 'ember-route-action-helper/-private/internals';

function getCurrentInfos(router) {
  let routerLib = router._routerMicrolib || router.router;

  return {
    currentInfos: routerLib.currentRouteInfos || routerLib.currentHandlerInfos,
    mapBy: (routerLib.currentRouteInfos && 'route') || 'handler',
  };
}

function getRoutes(router) {
  const { currentInfos, mapBy } = getCurrentInfos(router);
  return emberArray(currentInfos).mapBy(mapBy).reverse();
}

function getRouteWithAction(router, actionName) {
  let action;

  let handler = emberArray(getRoutes(router)).find((route) => {
    let actions = route.actions || route._actions;
    action = actions && actions[actionName];

    return typeof action === 'function';
  });

  return { action, handler };
}

function noop() {}
noop[ACTION] = true;

export default Helper.extend({
  router: computed(function () {
    try {
      const owner = getOwner(this);
      if (!owner || owner.isDestroying || owner.isDestroyed) {
        return null;
      }

      return owner.lookup('router:main');
    } catch {
      return null;
    }
  }).readOnly(),

  compute([actionName, ...params]) {
    let router = get(this, 'router');

    if (!router) {
      return noop;
    }

    let routeAction = function (...invocationArgs) {
      try {
        let { action, handler } = getRouteWithAction(router, actionName);
        if (!handler || typeof action !== 'function') {
          return;
        }

        let args = params.concat(invocationArgs);
        return action.apply(handler, args);
      } catch {
        // Ignore teardown-time route action failures.
        return;
      }
    };

    routeAction[ACTION] = true;

    return routeAction;
  },
});
