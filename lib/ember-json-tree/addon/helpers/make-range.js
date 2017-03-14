import Ember from 'ember';

/**
 * Create an array with the index defined by the start and end params
 *
 * @class make-range
 * @submodule helpers
 *
 */

export function makeRange(params) {
  /**
   * @function makeRange
   * @param {Integer} params[0]
   * @param {Integer} params[1]
   * @return {Array} range
   */

  let range = [];
  for(let i = params[0]; i < params[1]; ++i) {
    range.push(i);
  }
  return range;
}

export default Ember.Helper.helper(makeRange);
