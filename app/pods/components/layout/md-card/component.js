import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  /**
   * Component that renders a Bootstrap card.
   *
   * @module mdeditor
   * @submodule components-layout
   * @class md-card
   * @constructor
   */

  attributeBindings: ['data-spy'],

  /**
   * The card title.
   *
   * @property title
   * @type {String}
   * @required
   */

  /**
   * If true, the "row" class will be added to the card body.
   *
   * @property bodyIsRow
   * @type {Boolean}
   * @default undefined
   */

  /**
   * The data-spy text. Defaults to the title.
   *
   * @property data-spy
   * @type {String}
   * @default "this.title"
   * @category computed
   */
  'data-spy': computed.oneWay('title')
});
