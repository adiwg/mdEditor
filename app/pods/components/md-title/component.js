import classic from 'ember-classic-decorator';
import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Breadcrumbs from 'ember-crumbly/components/bread-crumbs';
import { truncate } from 'ember-cli-string-helpers/helpers/truncate';
import layout from './template';
import {
  getOwner
} from '@ember/application';

@classic
@templateLayout(layout)
@tagName('')
export default class MdTitle extends Breadcrumbs {
  init() {
    super.init(...arguments);

    let applicationInstance = getOwner(this);

    this.set('applicationRoute', applicationInstance.lookup(
      'route:application'));
    this.set('classNameBindings', []);
  }

  @computed('routeHierarchy')
  get title() {
    return this.routeHierarchy.reduce((val, itm) => {
      return val + truncate([itm.title, 28, true]) + (itm.isTail ? '' :
        ' | ');
    }, '');
  }
}
