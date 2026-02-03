import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { once } from '@ember/runloop';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import { A } from '@ember/array';

const Validations = buildValidations({
  'resourceType': [
    validator('array-required', {
      track: ['type']
    })
  ]
});

@classic
export default class MdDocumentationComponent extends Component.extend(Validations) {
  tagName = 'form';

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function() {
      model.resourceType = model.resourceType ?? [];
      model.citation = A(model.citation ?? [{}]);
    });
  }

  /**
   * The string representing the path in the profile object for the resource.
   *
   * @property profilePath
   * @type {String}
   * @default "false"
   * @required
   */

  /**
   * The object to use as the data model for the resource.
   *
   * @property model
   * @type {Object}
   * @required
   */

  @alias('model.citation') citation;
  @alias('model.resourceType') resourceType;
}
