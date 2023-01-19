import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  setupController: function (controller) {
    // Call _super for default behavior
    this._super(...arguments);

    let systemId = this.paramsFor(
        'record.show.edit.taxonomy.collection.system')
      .system_id;

    controller.set('parentModel', this.modelFor('record.show.edit'));
    controller.set('systemId', systemId);
  },

  actions: {
    goBack() {
      this.transitionTo('record.show.edit.taxonomy.collection');
    }
  }
});
