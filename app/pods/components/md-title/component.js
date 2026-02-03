import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { truncate } from 'ember-cli-string-helpers/helpers/truncate';

/**
 * Component that generates a page title from the breadcrumb hierarchy.
 * Uses the breadcrumbs service to get route information.
 *
 * @class MdTitleComponent
 */
export default class MdTitleComponent extends Component {
  @service breadcrumbs;

  get title() {
    return this.breadcrumbs.routeHierarchy.reduce((val, crumb) => {
      return val + truncate([crumb.title, 28, true]) + (crumb.isTail ? '' : ' | ');
    }, '');
  }
}
