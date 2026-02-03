import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import {
  alias
} from '@ember/object/computed';
import {
  once
} from '@ember/runloop';
import { action } from '@ember/object';

import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import uuidV4 from "uuid/v4";

const Validations = buildValidations({
  'domainId': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'codeName': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'description': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

@classic
export default class MdDomainComponent extends Component.extend(Validations) {
  /**
   * The string representing the path in the profile object for the domain.
   *
   * @property profilePath
   * @type {String}
   * @default 'false'
   * @required
   */

  /**
   * The object to use as the data model for the domain.
   *
   * @property model
   * @type {Object}
   * @required
   */

   /**
    * The passed down editDomainItem method.
    *
    * @method editDomainItem
    * @param {Number} index
    * @required
    */

   /**
    * The passed down editCitation method.
    *
    * @method editCitation
    * @param {String} scrollTo
    * @required
    */

  tagName = 'form';

  @alias('model.domainId') domainId;
  @alias('model.codeName') codeName;
  @alias('model.description') description;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      model.domainId = model.domainId ?? uuidV4();
      model.domainItem = model.domainItem ?? [];
      model.domainReference = model.domainReference ?? {};
    });
  }

  @action
  editDomainItem(id){
    this.editDomainItem(id);
  }

  @action
  editCitation(scrollTo){
    this.editCitation(scrollTo);
  }
}
