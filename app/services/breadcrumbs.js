import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

/**
 * Custom breadcrumb service to replace ember-crumbly
 * 
 * Manages the breadcrumb hierarchy based on the current route
 */
export default class BreadcrumbsService extends Service {
  @tracked routeHierarchy = [];

  /**
   * Updates the breadcrumb hierarchy when the route changes
   * Called from the application route or router service
   */
  @action
  updateBreadcrumbs(routeInfos) {
    const hierarchy = [];
    
    if (!routeInfos || !Array.isArray(routeInfos)) {
      this.routeHierarchy = hierarchy;
      return;
    }
    
    routeInfos.forEach((routeInfo) => {
      const route = routeInfo.route;
      
      if (route && route.breadCrumb) {
        const breadcrumb = route.breadCrumb;
        const isTail = routeInfo === routeInfos[routeInfos.length - 1];
        
        hierarchy.push({
          title: breadcrumb.title || routeInfo.name,
          linkable: breadcrumb.linkable !== false && !isTail,
          routeName: routeInfo.name,
          params: routeInfo.params,
          isTail
        });
      }
    });
    
    this.routeHierarchy = hierarchy;
  }

  /**
   * Gets the page title from the breadcrumb hierarchy
   * Mimics the functionality from md-title component
   */
  get title() {
    return this.routeHierarchy.reduce((val, itm) => {
      const truncatedTitle = itm.title && itm.title.length > 28 
        ? itm.title.substring(0, 25) + '...'
        : itm.title || '';
      
      return val + truncatedTitle + (itm.isTail ? '' : ' | ');
    }, '');
  }
}
