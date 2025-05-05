import Component from '@ember/component';
import { truncate } from 'ember-cli-string-helpers/helpers/truncate';
import layout from './template';
import { computed, getWithDefault, get } from '@ember/object';
import { getOwner } from '@ember/application';
import { A as emberArray } from '@ember/array';
import { classify } from '@ember/string';
import { assert } from '@ember/debug';
import { typeOf, isPresent } from '@ember/utils';
import { copy } from 'ember-copy';
import { inject as service } from '@ember/service';

export default Component.extend({
  routerService: service('router'),
  layout,
  tagName: '',
  linkable: true,
  reverse: false,

  init() {
    this._super(...arguments);
    let applicationInstance = getOwner(this);
    this.set(
      'applicationRoute',
      applicationInstance.lookup('route:application')
    );
  },

  currentUrl: computed.readOnly('routerService.currentURL'),
  currentRouteName: computed.readOnly('routerService.currentRouteName'),

  routeHierarchy: computed(
    'currentUrl',
    'currentRouteName',
    'reverse',
    function () {
      get(this, 'currentUrl');
      const currentRouteName = getWithDefault(this, 'currentRouteName', false);

      assert('[md-title] Could not find a current route', currentRouteName);

      const routeNames = currentRouteName.split('.');
      const filteredRouteNames = this._filterIndexAndLoadingRoutes(routeNames);
      const crumbs = this._lookupBreadCrumb(routeNames, filteredRouteNames);

      return get(this, 'reverse') ? crumbs.reverse() : crumbs;
    }
  ),

  title: computed('routeHierarchy', function () {
    return this.routeHierarchy.reduce((val, itm) => {
      const title = itm.title || '';
      const truncated =
        title.length > 28 ? title.substring(0, 28) + '...' : title;
      return val + truncated + (itm.isTail ? '' : ' | ');
    }, '');
  }),

  _guessRoutePath(routeNames, name, index) {
    const routes = routeNames.slice(0, index + 1);

    if (routes.length === 1) {
      let path = `${name}.index`;
      return this._lookupRoute(path) ? path : name;
    }

    return routes.join('.');
  },

  _filterIndexAndLoadingRoutes(routeNames) {
    return routeNames.filter(
      (name) => !(name === 'index' || name === 'loading')
    );
  },

  _lookupRoute(routeName) {
    return getOwner(this).lookup(`route:${routeName}`);
  },

  _lookupBreadCrumb(routeNames, filteredRouteNames) {
    const defaultLinkable = get(this, 'linkable');
    const pathLength = filteredRouteNames.length;
    const breadCrumbs = emberArray();

    filteredRouteNames.map((name, index) => {
      let path = this._guessRoutePath(routeNames, name, index);
      const route = this._lookupRoute(path);
      const isHead = index === 0;
      const isTail = index === pathLength - 1;

      const crumbLinkable = index === pathLength - 1 ? false : defaultLinkable;

      assert(`[md-title] \`route:${path}\` was not found`, route);

      const multipleBreadCrumbs = route.get('breadCrumbs');

      if (multipleBreadCrumbs) {
        multipleBreadCrumbs.forEach((breadCrumb) => {
          breadCrumbs.pushObject(breadCrumb);
        });
      } else {
        let breadCrumb = copy(
          getWithDefault(route, 'breadCrumb', {
            title: classify(name),
          })
        );

        if (typeOf(breadCrumb) === 'null') {
          return;
        } else {
          if (isPresent(breadCrumb.path)) {
            path = breadCrumb.path;
          }

          breadCrumb.path = path;
          breadCrumb.isHead = isHead;
          breadCrumb.isTail = isTail;
          breadCrumb.linkable = breadCrumb.hasOwnProperty('linkable')
            ? breadCrumb.linkable
            : crumbLinkable;
        }

        breadCrumbs.pushObject(breadCrumb);
      }
    });

    return emberArray(
      breadCrumbs.filter((breadCrumb) => typeOf(breadCrumb) !== 'undefined')
    );
  },
});
