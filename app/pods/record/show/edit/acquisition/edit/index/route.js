import Route from '@ember/routing/route';
import { get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  setupController: function () {
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit.main'));
    this.controller.set(
      'acquisitionId',
      get(
        this.controllerFor('record.show.edit.acquisition.edit'),
        'acquisitionId'
      )
    );
  },
  // actions: {
  //   editPlatform(index) {
  //     this.transitionTo(
  //       'record.show.edit.acquisition.edit.platform',
  //       index
  //     ).then(
  //       function () {
  //         this.setScrollTo('platform');
  //       }.bind(this)
  //     );
  //   },
  // },
});
