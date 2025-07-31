import Route from '@ember/routing/route';

export default Route.extend({
  setupController(controller, model) {
    this._super(controller, model);

    controller.setProperties({
      writer: controller.writer || null,
      forceValid: controller.forceValid || false,
      showAllTags: controller.showAllTags || false,
    });
  },

  actions: {
    goToSettings() {
      this.transitionTo('settings.main');
    },
  },
});
