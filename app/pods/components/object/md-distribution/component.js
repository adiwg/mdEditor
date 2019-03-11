import Component from '@ember/component';
import { once } from '@ember/runloop';
import { set, getWithDefault, get } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model.json.metadata');

    once(this, function() {
      set(model, 'resourceDistribution', A(
        getWithDefault(model, 'resourceDistribution', [])));
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
  actions: {
    editDistribution(index){
      this.editDistribution(index);
    },
    deleteDistribution(index){
      this.deleteDistribution(index);
    },
    addDistribution(){
      this.addDistribution();
    },
  }
});
