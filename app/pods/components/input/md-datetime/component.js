import Ember from 'ember';

export default Ember.Component.extend({
/**
 * An object listing the icon classes
 * @type {Object}
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
