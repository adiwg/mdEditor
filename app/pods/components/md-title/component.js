import classic from 'ember-classic-decorator';
import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { truncate } from 'ember-cli-string-helpers/helpers/truncate';
import layout from './template';

@classic
@templateLayout(layout)
@tagName('')
export default class MdTitle extends Component {
  @service breadcrumbs;

  @computed('breadcrumbs.routeHierarchy')
  get title() {
    return this.breadcrumbs.routeHierarchy.reduce((val, itm) => {
      return val + truncate([itm.title, 28, true]) + (itm.isTail ? '' :
        ' | ');
    }, '');
  }

  @computed('breadcrumbs.routeHierarchy')
  get routeHierarchy() {
    return this.breadcrumbs.routeHierarchy;
  }
}
