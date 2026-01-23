import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
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

export default class AttributeRoute extends Route {
  @service flashMessages;
  beforeModel() {
    this.set('entityId', this.paramsFor(
      'dictionary.show.edit.entity.edit').entity_id);
  }
  model(params) {
    this.set('attributeId', params.attribute_id);

    return this.setupModel();
  }
  // breadCrumb: computed('attributeId', function () {
  //   let model = get(this, 'currentRouteModel').call(this);
  //
  //   return {
  //     title: 'Attribute: ' + (get(model,'codeName') || get(this, 'attributeId'))
  //   };
  // }),

  setupController(controller, model) {
    super.setupController(controller, model);

    this.controller.set('setupModel', this.setupModel);

  }
  setupModel() {
    let attributeId = this.attributeId;
    let model = this.modelFor('dictionary.show.edit');
    let objects = model.get('json.dataDictionary.entity.' + this.entityId + '.attribute');
    let resource = attributeId && isArray(objects) ? objects.objectAt(
        attributeId) :
      undefined;

    //make sure the entity item exists
    if(isEmpty(resource)) {
      this.flashMessages
        .warning('No Attribute found! Re-directing to Entity...');
      this.replaceWith('dictionary.show.edit.entity.edit');

      return;
    }

    return resource;
  }
    backToEntity() {
      this.transitionTo('dictionary.show.edit.entity.edit',
        this.entityId);
    }
    editIdentifier(index) {
      let model = this.currentRouteModel();

      this.transitionTo(
          'dictionary.show.edit.entity.edit.attribute.identifier',
          get(model, 'attributeReference.identifier.' + index))
        .then(function () {
          this.setScrollTo('identifier');
        }.bind(this));
    }
}