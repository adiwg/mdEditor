import Route from '@ember/routing/route';
import {
  //computed,
  get
} from '@ember/object';
import {
  isArray
} from '@ember/array';
import {
  isEmpty
} from '@ember/utils';

export default Route.extend({
  beforeModel(transition) {
    this.set('entityId', transition.params[
      'dictionary.show.edit.entity.edit'].entity_id);
  },
  model(params) {
    this.set('attributeId', params.attribute_id);

    return this.setupModel();
  },

  // breadCrumb: computed('attributeId', function () {
  //   let model = get(this, 'currentRouteModel').call(this);
  //
  //   return {
  //     title: 'Attribute: ' + (get(model,'codeName') || get(this, 'attributeId'))
  //   };
  // }),

  setupController(controller, model) {
    this._super(controller, model);

    this.controller.set('setupModel', get(this, 'setupModel'));

  },

  setupModel() {
    let attributeId = get(this, 'attributeId');
    let model = this.modelFor('dictionary.show.edit');
    let objects = model.get('json.dataDictionary.entity.' + get(this,
      'entityId') + '.attribute');
    let resource = attributeId && isArray(objects) ? objects.objectAt(
        attributeId) :
      undefined;

    //make sure the entity item exists
    if(isEmpty(resource)) {
      get(this, 'flashMessages')
        .warning('No Attribute found! Re-directing to Entity...');
      this.replaceWith('dictionary.show.edit.entity.edit');

      return;
    }

    return resource;
  },

  actions: {
    backToEntity() {
      this.transitionTo('dictionary.show.edit.entity.edit',
        this.get('entityId'));
    },
    editIdentifier(index) {
      let model = this.get('currentRouteModel')();

      this.transitionTo(
          'dictionary.show.edit.entity.edit.attribute.identifier',
          get(model, 'attributeReference.identifier.' + index))
        .then(function () {
          this.setScrollTo('identifier');
        }.bind(this));
    }
  }
});
