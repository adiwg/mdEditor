import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  setupController: function (controller) {
    // Call _super for default behavior
    this._super(...arguments);

    let sourceId = this.paramsFor(
      'record.show.edit.acquisition.edit.platform'
    ).platform_id;

    controller.set('parentModel', this.modelFor('record.show.edit'));
    controller.set('platformId', platformId);
  },

  actions: {
    goBack() {
      this.transitionTo('record.show.edit.acquisition.edit');
    },
  },
});
