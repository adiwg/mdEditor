import Route from '@ember/routing/route';

export default class RecordRoute extends Route {
  init() {
    super.init(...arguments);

    this.breadCrumb = {
      title: 'Record',
      linkable: false
    }
  }
}