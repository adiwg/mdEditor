import Ember from 'ember';

const {
  Component,
  set,
  get,
  getWithDefault
} = Ember;

export default Component.extend({
  init() {
    this._super(...arguments);

    let model = get(this, 'model');
    set(model, 'responsibleParty', getWithDefault(model, 'responsibleParty', []));
    set(model, 'onlineResource', getWithDefault(model, 'onlineResource', []));
    set(model, 'identifier', getWithDefault(model, 'identifier', []));
  },
  tagName: 'form',

  /**
   * profilePath
   *
   * @property myProperty
   * @type {Boolean}
   * @default "false"
   * @static
   * @readOnly
   * @writeOnce
   * @optional
   * @required
   */

  /**
   * model
   *
   * @property myProperty
   * @type {Boolean}
   * @default "false"
   * @static
   * @readOnly
   * @writeOnce
   * @optional
   * @required
   */
});
