import Breadcrumbs from 'ember-crumbly/components/bread-crumbs';
import { truncate } from 'ember-cli-string-helpers/helpers/truncate';
import layout from './template';
import { getOwner } from '@ember/application';
import classic from 'ember-classic-decorator';

@classic
export default class MdTitleComponent extends Breadcrumbs {
  layout = layout;
  tagName = '';

  constructor() {
    super(...arguments);

    let applicationInstance = getOwner(this);

    this.applicationRoute = applicationInstance.lookup('route:application');
    this.classNameBindings = [];
  }

  get title() {
    return this.routeHierarchy.reduce((val, itm) => {
      return val + truncate([itm.title, 28, true]) + (itm.isTail ? '' : ' | ');
    }, '');
  }
}
