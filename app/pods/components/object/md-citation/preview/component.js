import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * Title for the card
   *
   * @property title
   * @type {String}
   * @default "Citation"
   * @required
   */
  title: "Citation",

  /**
   * Indicates if object is required.
   *
   * @property required
   * @type {Boolean}
   * @default "false"
   */
  required: false,

  /**
   * Indicates if object text is muted.
   *
   * @property muted
   * @type {Boolean}
   * @default "true"
   */
  muted: true
});
