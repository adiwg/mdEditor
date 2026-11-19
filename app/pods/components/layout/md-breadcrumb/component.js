import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

/**
 * Breadcrumb navigation component that displays the current route hierarchy.
 * Uses the breadcrumbs service to get route information.
 *
 * @class MdBreadcrumbComponent
 */
export default class MdBreadcrumbComponent extends Component {
  @service breadcrumbs;

  get routeHierarchy() {
    return this.breadcrumbs.routeHierarchy;
  }
}
