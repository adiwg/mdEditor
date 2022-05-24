import Route from '@ember/routing/route';
import {
  get,
  set,
  getWithDefault
} from '@ember/object';
import $ from 'jquery';
// import {
//   once
// } from '@ember/runloop';
import EmberObject from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata.resourceInfo');
    set(model, 'taxonomy', getWithDefault(model, 'taxonomy', []));
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
  },

  actions: {
    editCollection(id) {
      this.setScrollTo(`collection-${id}`);
      this.transitionTo('record.show.edit.taxonomy.collection.index', id);
    },
    addCollection() {
      let taxa = this.currentRouteModel()
        .get('json.metadata.resourceInfo.taxonomy');
      let collection = EmberObject.create({});

      // once(this, () => {

        taxa.pushObject(collection);
        this.setScrollTo(`collection-${taxa.length-1}`);
        this.transitionTo('record.show.edit.taxonomy.collection.index',
          taxa.length - 1);

        $("html, body").animate({
          scrollTop: $(document).height()
        }, "slow");
      // });

    },
    deleteCollection(id) {
      let taxa = this.currentRouteModel().get(
        'json.metadata.resourceInfo.taxonomy');

      taxa.removeAt(id);
    }
  }
});
