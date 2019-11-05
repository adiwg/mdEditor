import Component from '@ember/component';
import { once } from '@ember/runloop';
import { set, getWithDefault } from '@ember/object';
import { alias, notEmpty, not } from '@ember/object/computed';
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

export default Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    once(this, function() {
      set(this.model, 'distributor',
        getWithDefault(this.model, 'distributor', []));
    });
  },

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

  attributeBindings: ['data-spy'],
  tagName: 'section',
  distributor: alias('model.distributor'),
  description: alias('model.description'),
  distributorRequired: not('validations.attrs.distributor.options.array-required.disabled'),

  actions: {
    editDistributor(index){
      this.editDistributor(index);
    },
    deleteDistribution(index){
      this.deleteDistribution(index);
    },
    addDistribution(){
      this.addDistribution();
    },
  }
});
