import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

/**
 * Custom breadcrumb component to replace ember-crumbly BreadCrumbs
 * 
 * Displays breadcrumb navigation based on the current route hierarchy
 */
export default class CustomBreadcrumbsComponent extends Component {
  @service breadcrumbs;
  @service router;

  get tagName() {
    return this.args.tagName || 'ol';
  }

  get linkable() {
    return this.args.linkable !== false;
  }

  get breadcrumbHierarchy() {
    return this.breadcrumbs.routeHierarchy;
  }

  @action
  navigateToRoute(routeName, params) {
    if (this.linkable && routeName) {
      this.router.transitionTo(routeName, params);
    }
  }
}
