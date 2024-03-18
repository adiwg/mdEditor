import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { defineProperty } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Route.extend(ScrollTo, {
  setupController(controller, model) {
    this._super(controller, model);

    defineProperty(
      this.controller,
      'refreshSpy',
      alias('model.json.metadata.resourceInfo.extent.length')
    );
  },
});
