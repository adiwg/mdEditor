import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { set } from '@ember/object';
import { once } from '@ember/runloop';
import { action } from '@ember/object';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import { A } from '@ember/array';

const Validations = buildValidations({
  'role': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'contacts': validator('length', {
    min: 1,
    message: 'At least one contact is required.'
  })
});

@classic
export default class MdDistributorComponent extends Component.extend(Validations) {
  tagName = 'form';

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

  @alias('model.contact.role') role;

  get contacts() {
    let party = this.model?.contact?.party;
    return party ? party.mapBy('contactId') : null;
  }

  set contacts(value) {
    let map = value.map((itm) => {
      return {
        contactId: itm
      };
    });
    this.model.contact.party = map;
    return value;
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function() {
      model.contact = model.contact ?? {
        role: null,
        party: []
      };
      model.orderProcess = A(model.orderProcess ?? [{}]);
      model.transferOption = A(model.transferOption ?? [{}]);
    });
  }

  @action
  editTransferOption(index){
    this.editTransferOption(index);
  }
}
