import Ember from 'ember';

export function makeRange(params) {
  let range = [];
  for(let i = params[0]; i < params[1]; ++i) {
    range.push(i);
  }
  return range;
}

export default Ember.Helper.helper(makeRange);
