import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { modifier } from 'ember-modifier';

export default class BreadcrumbsContainerComponent extends Component {
  constructor() {
    super(...arguments);
    console.log('BreadcrumbsContainerComponent');
  }
  @service('breadcrumbs') breadcrumbsService;

  container = null;

  insertedBreadcrumbContainer = modifier((element) => {
    // A child `ol` is rendered in the Hds::Breadcrumb container and this is
    // the element that the in-element helper should drop breadcrumbs into.
    this.container = {
      element: element.querySelector('ol'),
    };

    this.breadcrumbsService.registerContainer(this.container);

    return () => this.breadcrumbsService.unregisterContainer(this.container);
  });
}
