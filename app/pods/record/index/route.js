import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  init() {
    super.init(...arguments);

    this.breadCrumb = {
      title: 'Record',
      linkable: false
    }
  }
}
