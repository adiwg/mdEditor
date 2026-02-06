import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { getOwner } from '@ember/application';
import { capitalize } from '@ember/string';

/**
 * A breadcrumb service that reads `breadCrumb` properties from routes
 * to generate navigation breadcrumbs. This replaces ember-crumbly.
 *
 * Routes can define breadcrumbs like:
 *   breadCrumb = { title: 'My Route', linkable: true }
 *   breadCrumb = null  // to opt-out of breadcrumb display
 *
 * @class BreadcrumbsService
 */
export default class BreadcrumbsService extends Service {
  @service router;

  /**
   * Track route changes to recompute breadcrumbs
   */
  @tracked _routeChangeCounter = 0;

  constructor() {
    super(...arguments);
    // Listen to route changes
    this.router.on('routeDidChange', () => {
      this._routeChangeCounter++;
    });
  }

  /**
   * Get the current route hierarchy as an array of breadcrumb objects.
   * Each object has: { title, path, linkable, isHead, isTail, model }
   *
   * @property routeHierarchy
   * @type {Array}
   */
  get routeHierarchy() {
    // Access tracked property to trigger recomputation on route changes
    this._routeChangeCounter;

    const currentRouteName = this.router.currentRouteName;
    if (!currentRouteName) {
      return [];
    }

    const routeNames = this._splitRouteName(currentRouteName);
    const breadcrumbs = [];

    for (let i = 0; i < routeNames.length; i++) {
      const routeName = routeNames.slice(0, i + 1).join('.');
      const breadcrumb = this._lookupBreadcrumb(routeName);

      if (breadcrumb !== null) {
        breadcrumbs.push(breadcrumb);
      }
    }

    // Set isHead and isTail flags
    breadcrumbs.forEach((crumb, index) => {
      crumb.isHead = index === 0;
      crumb.isTail = index === breadcrumbs.length - 1;
    });

    return breadcrumbs;
  }

  /**
   * Split route name into segments, filtering out 'index' routes
   * @private
   */
  _splitRouteName(routeName) {
    return routeName
      .split('.')
      .filter((segment) => segment !== 'index' && segment !== 'loading' && segment !== 'error');
  }

  /**
   * Look up a route and extract its breadCrumb property
   * @private
   */
  _lookupBreadcrumb(routeName) {
    const owner = getOwner(this);
    const route = owner.lookup(`route:${routeName}`);

    if (!route) {
      return null;
    }

    const breadCrumb = route.breadCrumb;

    // If breadCrumb is explicitly null, skip this route
    if (breadCrumb === null) {
      return null;
    }

    // If breadCrumb is undefined, create a default one from the route name
    const defaultTitle = this._getDefaultTitle(routeName);

    if (breadCrumb === undefined) {
      return {
        title: defaultTitle,
        path: routeName,
        linkable: true,
        model: this._getRouteModel(route, routeName),
      };
    }

    // Merge provided breadCrumb with defaults
    return {
      title: breadCrumb.title ?? defaultTitle,
      path: breadCrumb.path ?? routeName,
      linkable: breadCrumb.linkable !== false,
      model: this._getRouteModel(route, routeName),
    };
  }

  /**
   * Get the default title from the last segment of the route name
   * @private
   */
  _getDefaultTitle(routeName) {
    const segments = routeName.split('.');
    const lastSegment = segments[segments.length - 1];
    return capitalize(lastSegment.replace(/-/g, ' '));
  }

  /**
   * Check if a route has dynamic segments that require a model
   * @private
   */
  _routeRequiresModel(routeName) {
    // Routes with dynamic segments (e.g., record.show has :record_id)
    const routesWithDynamicSegments = [
      'record.show',
      'record.new.id',
      'contact.show',
      'dictionary.show',
    ];
    return routesWithDynamicSegments.some(r => routeName.startsWith(r));
  }

  /**
   * Get the model from the route's controller if available
   * @private
   */
  _getRouteModel(route, routeName) {
    // Only return model for routes that actually need it
    if (!this._routeRequiresModel(routeName)) {
      return undefined;
    }
    try {
      const controller = route.controller;
      const model = controller?.model;
      // Only return model if it has an id (valid Ember Data record)
      if (model && model.id) {
        return model;
      }
      return undefined;
    } catch {
      return undefined;
    }
  }
}
