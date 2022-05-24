import Route from '@ember/routing/route';

export default Route.extend({
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Contact',
      linkable: false
    }
  }
});
