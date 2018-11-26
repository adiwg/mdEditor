import { helper as buildHelper } from '@ember/component/helper';

/**
 * Create an array with the index defined by the start and end params
 *
 * @module ember-json-tree
 * @submodule helpers
 * @class make-range
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

export default buildHelper(makeRange);
