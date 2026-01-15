import Route from '@ember/routing/route';

export default class SyncRoute extends Route {
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Sync',
      linkable: false
    }
  }
}