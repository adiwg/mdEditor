import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  setupController: function (controller) {
    // Call _super for default behavior
    this._super(...arguments);

    let sourceId = this.paramsFor(
      'record.show.edit.lineage.lineageobject.source'
    ).source_id;

    controller.set('parentModel', this.modelFor('record.show.edit'));
    controller.set('sourceId', sourceId);
  },

  actions: {
    goBack() {
      this.transitionTo('record.show.edit.lineage.lineageobject');
    },
  },
});
