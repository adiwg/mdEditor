/* global define, require */
/* eslint-env browser */

// Make jQuery available globally for Bootstrap components and jquery-jsonview
// while maintaining Ember's jQuery-free architecture

/* global jQuery */
// Ensure jQuery is available globally for Bootstrap components
if (typeof window !== 'undefined' && typeof jQuery !== 'undefined') {
  window.jQuery = jQuery;
  window.$ = jQuery;
}
