import Component from '@ember/component';

export default Component.extend({
  /**
   * Button style.
   *
   * @property column.buttonConfig.style
   * @type {String}
   */

  /**
   * Text to display in the button.
   *
   * @property column.buttonConfig.title
   * @type {String}
   */

  /**
   * The record passed to the component.
   *
   * @property record
   * @type {Object}
   */

  /**
   * Action to run on button click
   *
   * @property column.buttonConfig.action
   * @param {Object} record The row record
   */
  action() {},
});
