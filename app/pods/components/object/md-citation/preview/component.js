import Component from '@ember/component';

export default Component.extend({
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
  muted: true,

  /**
   * Passed in action.
   *
   * @method editCitation
   * @param {String} scrollTo Identifier to scrollTo
   * @required
   * @return {undefined}
   */

  actions: {
    editCitation(scrollTo) {
      this.editCitation(scrollTo);
    }
  }
});
