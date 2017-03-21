/**
 * @module mdeditor
 * @submodule components-input
 */

import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * Datetime control with dropdown calendar.
   * Based on Bootstrap datetime picker.
   *
   * @class md-datetime
   * @constructor
   */

  /**
   * Datetime string passed in, edited, and returned.
   *
   * @property date
   * @type String
   * @default null
   * @return String
   */
  date: null,

  /**
   * Format of date string for property 'date'.
   *
   * @property format
   * @type String
   * @default 'YYYY-MM-DD'
   */
  format: 'YYYY-MM-DD',

  /**
   * The string to display when no datetime is selected.
   *
   * @property placeholder
   * @type String
   * @default 'Enter date or datetime'
   */
  placeholder: "Enter date or datetime",

  /**
   * Form label for datetime input.
   *
   * @property label
   * @type String
   * @default null
   */
  label: null,

  /**
   * Icons to be used by the datetime picker and calendar.
   * Icons can be set for time, date, up, down, previous, next,
   * and close.
   * The default icons are chosen from Font Awesome icons
   *
   * @property calendarIcons
   * @type Object
   * @default 'calendarIcons'
   */
  calendarIcons: {
    time: "fa fa-clock-o",
    date: "fa fa-calendar",
    up: "fa fa-chevron-up",
    down: "fa fa-chevron-down",
    previous: "fa fa-angle-double-left",
    next: "fa fa-angle-double-right",
    close: "fa fa-times"
  }


});
