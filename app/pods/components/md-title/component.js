import Breadcrumbs from 'ember-crumbly/components/bread-crumbs';
import { truncate } from 'ember-cli-string-helpers/helpers/truncate';
import layout from './template';
import {
  computed
} from '@ember/object';
import {
  getOwner
} from '@ember/application';

export default Breadcrumbs.extend({
  init() {
    this._super(...arguments);

    let applicationInstance = getOwner(this);

    this.set('applicationRoute', applicationInstance.lookup(
      'route:application'));
    this.set('classNameBindings', []);
  },
  layout,
  tagName: '',
  title: computed('routeHierarchy', function () {
    return this.get('routeHierarchy').reduce((val, itm) => {
      return val + truncate([itm.title, 28, true]) + (itm.isTail ? '' :
        ' | ');
    }, '');
  }),
});
