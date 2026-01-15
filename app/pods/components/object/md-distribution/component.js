import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { once } from '@ember/runloop';
import { alias, notEmpty, not } from '@ember/object/computed';
import { action } from '@ember/object';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'distributor': [
    validator('array-required', {
      track: ['distributor'],
      disabled: notEmpty('model.description'),
      message: 'At least one distributor is required if description is empty.'
    })
  ],
  'description': [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      disabled: notEmpty('model.distributor'),
      message: 'A description is required if a distributor is not entered.'
    })
  ]
});

@classic
export default class MdDistributionComponent extends Component.extend(Validations) {
  /**
   * The string representing the path in the profile object for the resource.
   *
   * @property profilePath
   * @type {String}
   * @default 'false'
   * @required
   */

  /**
   * The object to use as the data model for the resource.
   *
   * @property model
   * @type {Object}
   * @required
   */

  /**
   * The passed down addDistribution method.
   *
   * @method addDistribution
   * @required
   */

  /**
   * The passed down editDistribution method.
   *
   * @method editDistribution
   * @param {Number} index
   * @required
   */

  /**
   * The passed down deleteDistribution method.
   *
   * @method deleteDistribution
   * @param {Number} index
   * @required
   */

  attributeBindings = ['data-spy'];
  tagName = 'section';

  @alias('model.distributor') distributor;
  @alias('model.description') description;
  @not('validations.attrs.distributor.options.array-required.disabled') distributorRequired;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    once(this, function() {
      this.model.distributor = this.model.distributor ?? [];
    });
  }

  @action
  editDistributor(index){
    this.editDistributor(index);
  }

  @action
  deleteDistribution(index){
    this.deleteDistribution(index);
  }

  @action
  addDistribution(){
    this.addDistribution();
  }
}
