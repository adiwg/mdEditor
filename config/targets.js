'use strict';

/**
 * Browser targets for Ember 4.x
 *
 * Updated to remove IE11 support and target modern browsers.
 * This enables better performance and smaller bundle sizes.
 *
 * See: https://github.com/browserslist/browserslist
 */

module.exports = {
  browsers: [
    // Modern browsers - last 2 versions for better compatibility
    'last 2 Chrome versions',
    'last 2 Firefox versions',
    'last 2 Safari versions',
    'last 2 Edge versions',

    // Minimum browser versions for ES2017+ support
    'Chrome >= 90',
    'Firefox >= 88',
    'Safari >= 14',
    'Edge >= 90'
  ]
};
