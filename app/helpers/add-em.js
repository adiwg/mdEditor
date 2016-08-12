import Ember from 'ember';

export function addEm(params) {
  return params.reduce(function (a, b) {
    return a + b;
  });
}

export default Ember.Helper.helper(addEm);
