import Route from '@ember/routing/route';

export default class RecordRoute extends Route {
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Record',
      linkable: false
    }
  }
}