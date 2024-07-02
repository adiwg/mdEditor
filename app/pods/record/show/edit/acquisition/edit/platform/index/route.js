import Route from '@ember/routing/route';
import { get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  setupController: function (controller) {
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit.main'));
    this.controller.set(
      'platformId',
      get(
        this.controllerFor('record.show.edit.acquisition.edit.platform'),
        'platformId'
      )
    );
  },

  actions: {
    editInstrument(index) {
      this.transitionTo(
        'record.show.edit.acquisition.edit.platform.instrument',
        index
      ).then(
        function () {
          this.setScrollTo('instrument');
        }.bind(this)
      );
    },
    goBack() {
      this.transitionTo('record.show.edit.acquisition.edit');
    },
  },
});
