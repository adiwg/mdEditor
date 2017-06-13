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
    set(model, 'presentationForm', getWithDefault(model, 'presentationForm', []));
    set(model, 'onlineResource', getWithDefault(model, 'onlineResource', []));
    set(model, 'identifier', getWithDefault(model, 'identifier', []));
    set(model, 'graphic', getWithDefault(model, 'graphic', []));
    set(model, 'series', getWithDefault(model, 'series', {}));
  },
  tagName: 'form',

  /**
   * The string representing the path in the profile object for the citation.
   *
   * @property profilePath
   * @type {String}
   * @default "false"
   * @required
   */

  /**
   * The object to use as the data model for the citation.
   *
   * @property model
   * @type {Object}
   * @required
   */

  /**
   * Indicates whether the citation is embedded and should prevent recursion.
   *
   * @property embedded
   * @type {Boolean}
   * @default "false"
   */
  embedded: false
});
