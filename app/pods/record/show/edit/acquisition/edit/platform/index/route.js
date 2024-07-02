import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  setupController: function (controller) {
    this._super(...arguments);

    let platformId = this.paramsFor(
      'record.show.edit.acquisition.edit.platform'
    ).platform_id;

    controller.set('parentModel', this.modelFor('record.show.edit'));
    controller.set('platformId', platformId);
  },

  actions: {
    // editInstrument(index) {
    //   this.transitionTo(
    //     'record.show.edit.acquisition.edit.platform.instrument',
    //     index
    //   ).then(
    //     function () {
    //       this.setScrollTo('instrument');
    //     }.bind(this)
    //   );
    // },
    goBack() {
      this.transitionTo('record.show.edit.acquisition.edit');
    },
  },
});
