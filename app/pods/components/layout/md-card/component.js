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

  classNames: ['md-card', 'card'],
  classNameBindings: ['shadow:box-shadow--8dp'],
  attributeBindings: ['data-spy'],

  /**
   * The card element id.
   *
   * @property cardId
   * @type {String}
   * @readOnly
   * @category computed
   * @requires elementId
   */
  cardId: computed('elementId', function () {
      return 'card-' + this.get('elementId');
    })
    .readOnly(),

  /**
   * The card title.
   *
   * @property title
   * @type {String}
   * @required
   */

  /**
   * If true, the "row" the card body will be initally collapse.
   *
   * @property collapsed
   * @type {Boolean}
   * @default undefined
   */

  /**
   * If true, a box shadow will be rendered around the card.
   *
   * @property shadow
   * @type {Boolean}
   * @default true
   */
  shadow: true,

  /**
   * If true, the collapse control will be added to the card header.
   *
   * @property collapsible
   * @type {Boolean}
   * @default undefined
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
